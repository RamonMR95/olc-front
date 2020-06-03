import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../config/config";
import { UserExam } from '../models/user.exam.model';

@Injectable({
  providedIn: "root",
})
export class ExamService {
  constructor(private httpClient: HttpClient) {}

  getQuestionsAndAnswersByExamId(examId: number): Promise<any> {
    return this.httpClient
      .get<any>(`${API_URL}/exams/questions/answers?exam_id=${examId}`)
      .toPromise();
  }

  getExamByExamId(examId: number): Promise<any> {
    return this.httpClient
    .get<any>(`${API_URL}/exams?id=${examId}`)
    .toPromise();
  }

  submitExam(userExam: UserExam): Promise<any>{
    return this.httpClient
    .post<any>(`${API_URL}/user-exam`, userExam)
    .toPromise();
  }

}
