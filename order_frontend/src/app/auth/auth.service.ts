import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/auth/login/';
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, credentials).pipe(
      tap(user => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isSuperuser(): boolean {
    const user = this.getUser();
    return user ? user.is_superuser : false;
  }

  getUser() {
    const userString = localStorage.getItem('user');
    return this.userSubject.value || (userString ? JSON.parse(userString) : null);
  }

  isInGroup(group: string): boolean {
    const user = this.getUser();
    return user ? user.groups.includes(group) : false;
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    });
  }
}
