import { Component, OnInit } from "@angular/core";
import { SubjectService } from "src/app/services/subject.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ExamService } from "../../services/exam.service";
import { Exam } from "src/app/models/exam.model";
import { Observable } from 'rxjs';

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"],
})
export class SubjectsComponent implements OnInit {

  subjectsName: string[] = [];
  subject: string;
  exitsSubjects: boolean;
  exam: Exam;
  examList: Observable<Exam[]>;

  constructor(
    private subjectService: SubjectService,
    private examService: ExamService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getExams();
  }

  ngOnInit() {
    this.getSubjectsByCourseId();
  }

  async getSubjectsByCourseId() {
    await this.subjectService
      .getSubjectsByCourseId(this.route.snapshot.params.id)
      .then((sbj) => {
        this.subject = sbj;
        for (let i = 0; i < this.subject.length; i++) {
          this.subjectsName.push(this.subject[i]);
        }
        this.isSubjects();
      });
  }

  async isSubjects() {
    this.subjectsName.length > 0
      ? (this.exitsSubjects = true)
      : (this.exitsSubjects = false);
  }

  public handlerToSubject(nameSbj: string) {
    this.router.navigate(["subject/", nameSbj.toLowerCase(), "themes"]);
  }

  getExams() {
    let userId = parseInt(localStorage.getItem("id"));
    let courseId = this.route.snapshot.params.id;
    this.examList = this.examService.getExamsByUserIdAndCourseId(userId, courseId);
  }
}
