import { Component, OnInit } from "@angular/core";
import { NewsService } from "../../services/news.service";
import { News } from "src/app/models/news.model";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit {
  news: News[];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews(): void {
    this.newsService.getLast5News().then((nws) => (this.news = nws));
  }
}
