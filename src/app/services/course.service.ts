import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../config/config";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  constructor(private httpClient: HttpClient) {}

  getCourses(): Promise<any> {
    return this.httpClient.get<any>(`${API_URL}/courses/list`).toPromise();
  }

  getMentor(courseId: number): Promise<any> {
    return this.httpClient
      .get<any>(`${API_URL}/users/mentor?course_id=${courseId}`)
      .toPromise();
  }

  getSubjectsId(courseId: number): Promise<any> {
    return this.httpClient
      .get<any>(`${API_URL}/courses/subjects?course_id=${courseId}`)
      .toPromise();
  }

  getSubjects(): Promise<any> {
    return this.httpClient
      .get<any>(`${API_URL}/courses/course/subjects/list`)
      .toPromise();
  }

  getCourseSubjectAndMentorByMentorId(mentorId: number) {
    return this.httpClient.get<any>(`${API_URL}/courses/course/subjects?mentor_id=${mentorId}`).toPromise();
  }

  getCourseIdAndSubjects(): Promise<any> {
    return this.httpClient.get<any>(`${API_URL}/courses/course/subjects/list`).toPromise();
  }

  getMentorAndCourse(): Promise<any> {
    return this.httpClient.get<any>(`${API_URL}/users/mentor/list`).toPromise();
  }
}
