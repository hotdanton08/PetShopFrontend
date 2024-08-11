// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SimpleStore } from '../store/simple-store';
@Injectable({
  providedIn: 'root', // 這表示這個服務可以在整個應用中使用
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // 替換為你的後端 URL
  private authStore = new SimpleStore<{ user: any }>({ user: null }); // 使用 SimpleStore 來管理認證狀態

  constructor(private http: HttpClient, private router: Router) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      this.authStore.setState({ user: payload });
    }
  }

  // 登錄方法，返回一個 Observable
  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/users/login`, { email, password })
      .pipe(
        tap((response: any) => {
          console.log(response);
          if (response.data.accessToken && response.data.refreshToken) {
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken); // 保存 token 到本地存儲
            localStorage.setItem('refreshToken', response.data.refreshToken);
            const payload = JSON.parse(
              atob(response.data.accessToken.split('.')[1])
            );
            this.authStore.setState({ user: payload }); // 設置用戶狀態
          }
        })
      );
  }

  // 刷新 Token 方法
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post(`${this.apiUrl}/users/refresh-token`, { refreshToken })
      .pipe(
        tap((response: any) => {
          if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            const payload = JSON.parse(
              atob(response.data.accessToken.split('.')[1])
            );
            this.authStore.setState({ user: payload });
          }
        })
      );
  }

  // 登出方法
  logout() {
    localStorage.removeItem('accessToken'); // 移除本地存儲中的 accessToken
    localStorage.removeItem('refreshToken');
    this.authStore.setState({ user: null }); // 清除用戶狀態
    this.router.navigate(['/login']); // 導航到登錄頁面
  }

  // 獲取 accessToken 方法
  getToken(): string | null {
    return localStorage.getItem('accessToken'); // 從本地存儲中獲取 accessToken
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

  // 判斷是否已認證
  isAuthenticated(): boolean {
    return !!this.getToken(); // 判斷是否有 token
  }

  // 獲取用戶方法，返回 Observable
  getUser(): Observable<any> {
    return this.authStore.select('user');
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || null;
    }
    return null;
  }
}
