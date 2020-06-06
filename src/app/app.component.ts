import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { Course } from "./models/course.model";
import { User } from "./models/user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "olc-front";
  course: Course;
  user: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    let email = localStorage.getItem("email");
    if (email) {
      this.userService.getUserByEmail(email).then((usr) => {
        this.user = usr;
        this.course = usr.course;
      });
    }
  }
}
