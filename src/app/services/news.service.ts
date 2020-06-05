import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { News } from '../models/news.model';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: "root",
})
export class NewsService {
  constructor(private httpClient: HttpClient) {}

  getLast5News(): Promise<News[]> {
    return this.httpClient.get<News[]>(`${API_URL}/news/latest`).toPromise();
  }
}
