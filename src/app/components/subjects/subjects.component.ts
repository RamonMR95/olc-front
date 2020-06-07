import { Component, OnInit, Input } from "@angular/core";
import { SubjectService } from "src/app/services/subject.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ExamService } from "../../services/exam.service";
import { Exam } from "src/app/models/exam.model";
import { Observable } from 'rxjs';
import { CourseService } from '../../services/course.service';

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"],
})
export class SubjectsComponent implements OnInit {

  subjectsName: string[] = [];
  subject: string;
  courseName: string;
  exitsSubjects: boolean = true;
  exam: Exam;
  examList: Observable<Exam[]>;

  constructor(
    private subjectService: SubjectService,
    private examService: ExamService,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.getCourseName();
    this.getSubjectsByCourseId();
    this.getExams();
  }

  async getSubjectsByCourseId() {
    await this.subjectService
      .getSubjectsByCourseId(this.route.snapshot.params.id)
      .then((sbj) => {
        this.subject = sbj;
        for (let i = 0; i < this.subject.length; i++) {
          this.subjectsName.push(this.subject[i]);
        }
      });
      this.isSubjects();
  }

  isSubjects() {
    this.subjectsName.length > 0
      ? (this.exitsSubjects = this.exitsSubjects )
      : (this.exitsSubjects = !this.exitsSubjects );
  }

  public handlerToSubject(nameSbj: string) {
    this.router.navigate(["subject/", nameSbj.toLowerCase(), "themes"]);
  }

  getExams() {
    let userId = parseInt(localStorage.getItem("id"));
    let courseId = this.route.snapshot.params.id;
    this.examList = this.examService.getExamsByUserIdAndCourseId(userId, courseId);
  }

  getCourseName() {
    let courseId = this.route.snapshot.params.id;
    this.courseService.getCourseByCourseId(courseId).then(crs => this.courseName = crs.courseName);
  }
}
