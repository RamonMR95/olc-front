import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailContact } from '../interfaces/email.contact.interface';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }
  
  submitContactEmail(msg: EmailContact) {
    return this.httpClient.post<EmailContact>(`${API_URL}/email/contact-us`, msg).toPromise();
  }

}
