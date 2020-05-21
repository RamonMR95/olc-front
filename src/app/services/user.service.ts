import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../config/config";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Promise<any> {
    return this.httpClient.get<any>(`${API_URL}/users`).toPromise();
  }

  getUser(id: number): Promise<User> {
    return this.httpClient.get<User>(`${API_URL}/user?id=${id}`).toPromise();
  }

  createUser(user: User): Promise<User> {
    return this.httpClient.post<User>(`${API_URL}/create`, user).toPromise();
  }

  updateUser(user: User, id: number): Promise<User> {
    return this.httpClient
      .put<User>(`${API_URL}/user?id=${id}`, user)
      .toPromise();
  }

  deleteUser(id: number): Promise<User> {
    return this.httpClient.delete<User>(`${API_URL}/user?id=${id}`).toPromise();
  }
}
