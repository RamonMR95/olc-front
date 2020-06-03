import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserLogin } from "../interfaces/user.login.interface";
import { API_URL } from "../config/config";
import { JwtData } from '../interfaces/jwt.data.interface';

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  authenticate(user: UserLogin): Promise<UserLogin> {
    return this.httpClient.post<UserLogin>(`${API_URL}/login`, user).toPromise();
  }

  isAuthenticated() {
    return localStorage.getItem("token") != null;
  }

  setLocalStorage(data: JwtData): void {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);
    localStorage.setItem("exp", data.exp);
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("exp");
  }
}
