import { Component, OnInit } from "@angular/core";
import { NewsService } from "../../services/news.service";
import { News } from "src/app/models/news.model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit {
  news: News[];
  form: FormGroup;
  create: boolean = false;

  constructor(
    private newsService: NewsService,
    public router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadNews();
    this.initForm();
  }

  loadNews(): void {
    this.newsService.getLast5News().subscribe((n) => (this.news = n));
  }

  initForm(): void {
    this.form = this.fb.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      writer: ["", Validators.required],
    });
  }

  createNews(): void {
    let news: News = new News(
      this.form.controls.title.value,
      this.form.controls.content.value,
      this.form.controls.writer.value
    );

    this.newsService.createNews(news).subscribe((_) => {
      Swal.fire("Notice created!", "You have Created a Notice.", "success");
      this.toggleCreate();
      this.loadNews();
    });
  }

  toggleCreate(): void {
    this.create = !this.create;
    this.clearFormData();
  }

  clearFormData(): void {
    this.form.reset();
  }

  isTeacher(): boolean {
    return localStorage.getItem('role').toUpperCase() === 'TEACHER';
  }

}
