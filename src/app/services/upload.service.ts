import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL } from '../config/config';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  uploadPhoto(userId: number, url: string): Promise<User> {
    return this.httpClient.get<User>(`${API_URL}/users/photo?user_id=${userId}&url=${url}`).toPromise();
  }
}
