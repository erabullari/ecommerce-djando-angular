import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from "../../environments"; // Ensure this import path is correct
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Order, OrderResponse, OrderUnit, User } from "./order.interface";

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly ORDER_ENDPOINT = `${environments.API_HOST}/orders/`;
  private readonly USER_ENDPOINT = `${environments.API_HOST}/users/`;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  getAllOrders(): Observable<{ results: Order[] }> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<{ results: Order[] }>(this.ORDER_ENDPOINT, { headers });
  }

  getOrders(): Observable<OrderResponse> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<OrderResponse>(this.ORDER_ENDPOINT, { headers });
  }

  getUserById(userId: number): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<User>(`${this.USER_ENDPOINT}${userId}/`, { headers });
  }

  getSingleOrderById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(`${this.ORDER_ENDPOINT}${id}/`, { headers });
  }

  createOrder(params: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.post(this.ORDER_ENDPOINT, params, { headers });
  }

  deleteOrder(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(`${this.ORDER_ENDPOINT}${id}/`, { headers });
  }

  deleteOrderUnit(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(`${this.ORDER_ENDPOINT}${id}/`, { headers });
  }

  getUserOrders(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(`${this.ORDER_ENDPOINT}${id}/`, { headers });
  }

  updateOrderDetails(id: number, userDetails: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.patch<any>(`${this.ORDER_ENDPOINT}${id}/`, userDetails, { headers });
  }

  saveOrderUnit(orderUnit: OrderUnit): Observable<OrderUnit> {
    const headers = this.getAuthHeaders();
    return this.httpClient.post<OrderUnit>(`${this.ORDER_ENDPOINT}`, orderUnit, { headers });
  }

  saveOrder(order: Order): Observable<Order> {
    const headers = this.getAuthHeaders();
    return this.httpClient.post<Order>(`${this.ORDER_ENDPOINT}`, order, { headers });
  }
}
