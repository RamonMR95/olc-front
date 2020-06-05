import { Component, OnInit } from "@angular/core";
import { SubjectService } from '../../services/subject.service';
import { ActivatedRoute, Router } from "@angular/router";
import { SubjectTheme } from 'src/app/interfaces/subject.theme.interface';

@Component({
  selector: "app-topic",
  templateUrl: "./topic.component.html",
  styleUrls: ["./topic.component.scss"],
})
export class TopicComponent implements OnInit {
  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  private listTheme: SubjectTheme[] = [];

  ngOnInit() {
    this.getListThemeByName(this.route.snapshot.params.name);
  }

 async getListThemeByName(name: string) {
   await this.subjectService
      .getThemeBySubjectsName(name)
      .then((themeList) => {
        for (let i = 0; i < themeList.length; i++) {
          let theme: SubjectTheme = {
            id: themeList[i].id,
            title: themeList[i].name,
            description: themeList[i].description,
          };
          this.listTheme.push(theme);
        }
      });
  }
}
