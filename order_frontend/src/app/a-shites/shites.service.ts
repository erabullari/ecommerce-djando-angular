import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from '../../environments';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ShitesService {
  private readonly CUSTOMERS_ENDPOINT = `${environments.API_HOST}/customers/`;

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  getAllCustomers(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get(this.CUSTOMERS_ENDPOINT, { headers });
  }

  getCustomerDetails(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(`${this.CUSTOMERS_ENDPOINT}${id}/`, { headers });
  }

  updateCustomerDetails(id: number, customerDetails: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.patch<any>(`${this.CUSTOMERS_ENDPOINT}${id}/`, customerDetails, { headers });
  }

  deleteCustomer(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(`${this.CUSTOMERS_ENDPOINT}${id}/`, { headers });
  }

  createCustomer(params: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.post(this.CUSTOMERS_ENDPOINT, params, { headers });
  }
}
