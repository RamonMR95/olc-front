import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../config/config";
import { UserExam } from "../models/user.exam.model";
import { Exam } from "../models/exam.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Question } from '../models/question.model';
import { QuestionAnswer } from '../interfaces/question.answer.interface';

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

  submitExam(userExam: UserExam): Promise<any> {
    return this.httpClient
      .post<any>(`${API_URL}/user-exam`, userExam)
      .toPromise();
  }

  getUserExamByUserId(userId: number, examId: number): Promise<any> {
    return this.httpClient
      .get<any>(`${API_URL}/user-exam/exam?user_id=${userId}&exam_id=${examId}`)
      .toPromise();
  }

  getExamsByUserIdAndCourseId(userId: number, courseId: number): Observable<Exam[]> {
    return this.httpClient
      .get<Exam[]>(`${API_URL}/exams/not-done?user_id=${userId}&course_id=${courseId}`);
  }

  createExam(exam: Exam): Promise<any> {
    return this.httpClient.post<any>(`${API_URL}/exams/create`, exam).toPromise();
  }

  createQuestion(examId: number, question: QuestionAnswer): Promise<any> {
    return this.httpClient.post<any>(`${API_URL}/exams/create/question?exam_id=${examId}`, question).toPromise();
  }

  deleteExam(examId: number): Promise<any> {
    return this.httpClient.delete<any>(`${API_URL}/exams?id=${examId}`).toPromise();
  }
}
