import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../../services/user.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { User } from "../../models/user.model";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "nickName",
    "name",
    "surName",
    "course",
    "address",
    "role",
    "email",
  ];
  dataSource: MatTableDataSource<User>;
  users: User[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers(): void {
    this.userService.getUsers().then((usrs) => {
      this.users = usrs;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
