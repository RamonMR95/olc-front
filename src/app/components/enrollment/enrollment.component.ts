import { Component, OnInit, Input } from "@angular/core";
import { CourseSubject } from "../../interfaces/course.subject.interface";
import { UserService } from "../../services/user.service";
import { CourseService } from "../../services/course.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-enrollment",
  templateUrl: "./enrollment.component.html",
  styleUrls: ["./enrollment.component.scss"],
})
export class EnrollmentComponent implements OnInit {
  @Input() courseSB: CourseSubject;
  
  constructor(
    private userService: UserService,
    private courseService: CourseService
  ) {}

  ngOnInit() {}

  enroll(courseId: number) {
    let email = localStorage.getItem("email");
    if (email) {
      this.userService.getUserByEmail(email).then((usr) => {
        this.courseService.enroll(usr.id, courseId).then(_ => {
          Swal.fire({
            icon: 'success',
            title: 'Enrollment...',
            text: 'You have been enrolled to the course!'
          }).then(_ => location.reload())
        })
        .catch(_ => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "You cannot enroll to the course",
          })
        });
      });
    }
  }
  
  isStudent(): boolean {
    return localStorage.getItem("role").toUpperCase() === "STUDENT";

  }

}
