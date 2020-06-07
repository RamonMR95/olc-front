import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { News } from '../models/news.model';
import { API_URL } from '../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class NewsService {
  constructor(private httpClient: HttpClient) {}

  getLast5News(): Observable<News[]> {
    return this.httpClient.get<News[]>(`${API_URL}/news/latest`);
  }

  createNews(news: News): Observable<News> {
    return this.httpClient.post<News>(`${API_URL}/news/create`, news);
  }
}
