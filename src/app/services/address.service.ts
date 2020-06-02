import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config/config';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  getAddressByUserId(id: number): Promise<any> {
    return this.httpClient.get<any>(`${API_URL}/addresses/address?user_id=${id}`).toPromise();
  }

  updateUserAddress(address: Address, id: number): Promise<any> {
    return this.httpClient.put<any>(`${API_URL}/addresses?id=${id}`, address).toPromise();
  }


}
