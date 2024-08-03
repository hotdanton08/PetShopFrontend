import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrl = `${environment.backendUrl}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUserProfile(userId: string): Observable<any> {
    // 確保請求中包含 headers
    return this.http.get<any>(`${this.backendUrl}/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  updateUserProfile(userId: string, data: any): Observable<any> {
    console.log(data);
    return this.http.put<any>(`${this.backendUrl}/${userId}`, data, {
      headers: this.getHeaders(),
    });
  }

  changeUserPassword(passwordData: any): Observable<any> {
    return this.http.put<any>(
      `${this.backendUrl}/changePassword`,
      passwordData,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
