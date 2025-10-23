import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:5191/api/orders'; // your Web API endpoint

  constructor(private http: HttpClient) {}

  //get orders by customer ID by calling the HTTP get method of the API with a query parameter
  //The query parameter is optional, so if no customerId is provided, all orders will be returned
  getByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`, {
      params: { customerId: customerId.toString() }
    });
  }
}
