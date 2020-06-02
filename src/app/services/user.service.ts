import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../config/config";
import { User } from "../models/user.model";
import { UserMarksSubjects } from '../interfaces/user.marks.interface';

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Promise<any> {
    return this.httpClient.get<any>(`${API_URL}/users/list`).toPromise();
  }

  getUser(id: number): Promise<User> {
    return this.httpClient.get<User>(`${API_URL}/users?id=${id}`).toPromise();
  }

  getUserByEmail(email: string): Promise<User> {
    return this.httpClient.get<User>(`${API_URL}/users/email?email=${email}`).toPromise();
  }

  createUser(user: User): Promise<User> {
    return this.httpClient.post<User>(`${API_URL}/users/create`, user).toPromise();
  }

  updateUser(user: User, id: number): Promise<User> {
    return this.httpClient
      .put<User>(`${API_URL}/users?id=${id}`, user)
      .toPromise();
  }

  deleteUser(id: number): Promise<User> {
    return this.httpClient.delete<User>(`${API_URL}/users?id=${id}`).toPromise();
  }

  getUserMarksByIdAndDate(id: number, date: string): Promise<UserMarksSubjects> {
    return this.httpClient.get<UserMarksSubjects>(`${API_URL}/users/marks?id=${id}&year_start=${date}`).toPromise();
  }

  getMentorByCourseId(courseId: number): Promise<User> {
    return this.httpClient.get<User>(`${API_URL}/users/mentor?course_id=${courseId}`).toPromise();
  }

}
