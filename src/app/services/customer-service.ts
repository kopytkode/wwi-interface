import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../customers/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:5191/api/customers'; // your Web API endpoint

  constructor(private http: HttpClient) {}

  //in customer service
  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }
}