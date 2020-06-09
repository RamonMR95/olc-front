import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from '../config/config';
import { SubjectTheme } from '../interfaces/subject.theme.interface';

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  constructor(private httpClient: HttpClient) {}

  
  getSubjectsByCourseId(courseId: number): Promise<any> {
      return this.httpClient.get<any>(`${API_URL}/courses/subjects?course_id=${courseId}`).toPromise();
  }

  getThemeBySubjectsName(name: string): Promise<any> {
    return this.httpClient.get<any>(`${API_URL}/subject/topic?name=${name}`).toPromise();
  }

  getContentThemeByThemeId(topicId: number): Promise<any> {
    return this.httpClient.get<any>(`${API_URL}/subject/topicContent?topic_id=${topicId}`).toPromise();
  }

  getAllTheme(): Promise<any> {
    return this.httpClient.get<any>(`${API_URL}/subject/topic/list`).toPromise();
  }

  getSubjectBySubjectName(subjectName: string): Promise<any> {
    return this.httpClient.get<any>(`${API_URL}/subject/name?name=${subjectName}`).toPromise();
}
  
}