import { Component, OnInit } from "@angular/core";
import { SubjectService } from "src/app/services/subject.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"],
})
export class SubjectsComponent implements OnInit {
  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  private subjectsName: string[] = [];
  private subject: string;
  private exitsSubjects: boolean;

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
    this.router.navigate(["subject/",nameSbj.toLowerCase(),"themes"]);
  }

}
