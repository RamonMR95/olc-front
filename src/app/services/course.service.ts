import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  getCourses(): Promise<any> {
    return this.httpClient.get<any>(`${API_URL}/courses`).toPromise();
  }
}
