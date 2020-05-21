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

  getUserById(id: number): Promise<User> {
    return this.httpClient.get<User>(`${API_URL}/user?id=${id}`).toPromise();
  }
}
