import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from '../config/config';
import { Subject } from '../models/subject.model';

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  constructor(private httpClient: HttpClient) {}

  
  getSubjectsByCourseId(courseId: number): Promise<any> {
      return this.httpClient.get<any>(`${API_URL}/courses/subjects?course_id=${courseId}`).toPromise();
  }
  
}