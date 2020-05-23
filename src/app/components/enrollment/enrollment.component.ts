import { Component, OnInit, Input } from "@angular/core";
import { Course } from "src/app/models/course.model";

@Component({
  selector: "app-enrollment",
  templateUrl: "./enrollment.component.html",
  styleUrls: ["./enrollment.component.scss"],
})
export class EnrollmentComponent implements OnInit {
  @Input() course: Course;
  constructor() {}

  ngOnInit() {}
}
