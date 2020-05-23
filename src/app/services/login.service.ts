import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserLogin } from "../interfaces/user.login.interface";
import { API_URL } from "../config/config";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(user: UserLogin): Promise<any> {
    return this.httpClient
      .post<UserLogin>(`${API_URL}/login`, user)
      .toPromise();
  }
}
