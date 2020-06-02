import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from '../config/config';

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(private httpClient: HttpClient) {}

  
  getRole(user_id: number): Promise<any> {
      return this.httpClient.get<any>(`${API_URL}/users/role?user_id=${user_id}`).toPromise();
  }
  
}