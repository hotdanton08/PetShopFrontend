// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // 這表示這個服務可以在整個應用中使用
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // 替換為你的後端 URL

  constructor(private http: HttpClient, private router: Router) {}

  // 登錄方法，返回一個 Observable
  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/users/login`, { email, password })
      .pipe(
        tap((response: any) => {
          if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token); // 保存 token 到本地存儲
          }
        })
      );
  }

  // 登出方法
  logout() {
    localStorage.removeItem('token'); // 移除本地存儲中的 token
    this.router.navigate(['/login']); // 導航到登錄頁面
  }

  // 獲取 token 方法
  getToken(): string | null {
    return localStorage.getItem('token'); // 從本地存儲中獲取 token
  }

  // 獲取角色方法
  getRole(): string {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || '';
    }
    return '';
  }

  // 從 token 中解析用戶信息
  getUserFromToken(): any {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    }
    return null;
  }

  // 判斷是否已認證
  isAuthenticated(): boolean {
    return !!this.getToken(); // 判斷是否有 token
  }
}
