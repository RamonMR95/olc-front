import { Component, OnInit } from "@angular/core";
import { Course } from "src/app/models/course.model";
import { CourseService } from "../../services/course.service";
import { Enrollment } from "../../models/enrollment.model";

@Component({
  selector: "app-enrollment-list",
  templateUrl: "./enrollment-list.component.html",
  styleUrls: ["./enrollment-list.component.scss"],
})
export class EnrollmentListComponent implements OnInit {
  courses: Course[];
  courseSubjects: Enrollment[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.getEnrollment();
  }

  getEnrollment(): void {
    this.courseService.getCourses().then((crs) => {
      this.courses = crs;
      for (let i = 0; i < this.courses.length; i++) {
        this.courseService.getEnrollment(crs[i].id).then((enr) => {
          let enrollment = new Enrollment(enr.mentor, crs[i], enr.subjects);
          this.courseSubjects.push(enrollment);
        });
      }
    });
  }
}
