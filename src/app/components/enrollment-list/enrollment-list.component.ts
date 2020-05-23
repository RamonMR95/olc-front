import { Component, OnInit, Input } from "@angular/core";
import { Course } from "src/app/models/course.model";
import { CourseService } from "../../services/course.service";
import { API_URL } from "src/app/config/config";

@Component({
  selector: "app-enrollment-list",
  templateUrl: "./enrollment-list.component.html",
  styleUrls: ["./enrollment-list.component.scss"],
})
export class EnrollmentListComponent implements OnInit {
  courses: Course[];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().then((crses) => {
      this.courses = crses;
      console.log(crses)
    });
  }
}
