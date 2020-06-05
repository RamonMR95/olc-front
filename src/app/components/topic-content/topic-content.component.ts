import { Component, OnInit, Input } from "@angular/core";
import { SubjectTheme } from "src/app/interfaces/subject.theme.interface";
import { ContentTheme } from "src/app/interfaces/topic.content.interface";
import { SubjectService } from "../../services/subject.service";

@Component({
  selector: "app-topic-content",
  templateUrl: "./topic-content.component.html",
  styleUrls: ["./topic-content.component.scss"],
})
export class TopicContentComponent implements OnInit {
  @Input() private topics: SubjectTheme;
  private listContentTheme: ContentTheme[] = [];

  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.getAllContenntThemeByThemeId();
  }

  getAllContenntThemeByThemeId() {
      this.getContentThemeByThemeId(this.topics.id);
  }

  async getContentThemeByThemeId(themeId: number) {
    this.subjectService
      .getContentThemeByThemeId(themeId)
      .then((contentTopic) => {
        for (let i = 0; i < contentTopic.length; i++) {
          let content: ContentTheme = {
            subtitle: contentTopic[i].subtitle,
            url: contentTopic[i].url,
          };
          this.listContentTheme.push(content);
        }
      });
  }
}
