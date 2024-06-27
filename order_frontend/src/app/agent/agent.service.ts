import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from "../../environments"; // Ensure this import path is correct
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class AgentService {
  private readonly USERS_ENDPOINT = `${environments.API_HOST}/users/`;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  getAllUsers(): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log(headers);
    return this.httpClient.get(this.USERS_ENDPOINT, { headers });
  }

  getSingleUserById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(`${this.USERS_ENDPOINT}${id}/`, { headers });
  }

  createUser(params: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.post(this.USERS_ENDPOINT, params, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(`${this.USERS_ENDPOINT}${id}/`, { headers });
  }

  getUserDetails(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<any>(`${this.USERS_ENDPOINT}${id}/`, { headers });
  }

  updateUserDetails(id: number, userDetails: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.httpClient.patch<any>(`${this.USERS_ENDPOINT}${id}/`, userDetails, { headers });
  }
}
