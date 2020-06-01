import { Component, OnInit } from "@angular/core";
import { Course } from "src/app/models/course.model";
import { CourseService } from "../../services/course.service";
import { Subject } from '../../models/subject.model';
import { CourseSubject } from 'src/app/interfaces/course.subject.interface';

@Component({
  selector: "app-enrollment-list",
  templateUrl: "./enrollment-list.component.html",
  styleUrls: ["./enrollment-list.component.scss"],
})
export class EnrollmentListComponent implements OnInit {
  courses: Course[];
  mentor: string;
  subs: Subject[];
  courseSubjects: CourseSubject[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses().then(async (crses) => {
      this.courses = crses;
      for (let c of this.courses) {
        await this.getSubjectsId(c);
        await this.getMentor(c.id);
        let cs = { course: c, subjects: this.subs, mentor: this.mentor}
        this.courseSubjects.push(cs);
        this.subs = []
      }
    }).catch(console.log);
  }

  getSubjectsId(course: Course) {
    return this.courseService.getSubjectsId(course.id).then((subj) => {
      this.subs = subj;
    }).catch(console.log);
  }

  getMentor(courseId: number) {
    return this.courseService.getMentor(courseId).then((mnt) => {
      this.mentor = mnt.name;
    });
  }
}
