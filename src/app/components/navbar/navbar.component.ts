import { Component, OnInit, Input } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { Course } from "../../models/course.model";
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Input() course: Course;
  @Input() user: User;
  display: boolean;

  constructor(
    public loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  isMyProfile(): void {
    let userId = localStorage.getItem("id");
    let routeId = this.route.snapshot.params.id;
    this.display = userId === routeId;
  }

  handleLogout(): void {
    this.loginService.logout();
    this.router.navigate(["/home"]);
  }

 async redirectToProfile() {
    await this.router.navigate(["/profile", localStorage.getItem("id")])
    location.reload();
  }

  isTeacher(): boolean {
    return localStorage.getItem('role').toUpperCase() === 'TEACHER';
  }

}
