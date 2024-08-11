// src/app/interceptors/auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // 會攔截每個 HTTP 請求
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 從 AuthService 中獲取當前的 Access Token
    const token = this.authService.getToken();

    // 如果存在 Access Token，則將其添加到請求的 Authorization 標頭中
    if (token) {
      // 複製請求並設置 Authorization 標頭
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // 使用 next.handle 發送請求並處理響應
    return next.handle(request).pipe(
      // 使用 catchError 來處理請求中的錯誤
      catchError((error: HttpErrorResponse) => {
        // 如果服務器返回 401 Unauthorized 錯誤，且這不是 refresh-token 請求
        if (error.status === 401 && !request.url.endsWith('/refresh-token')) {
          // 調用 AuthService 的 refreshToken 方法來獲取新的 Access Token
          return this.authService.refreshToken().pipe(
            // 使用 switchMap 來處理刷新後的行為
            switchMap(() => {
              // 從 AuthService 中獲取新的 Access Token
              const newToken = this.authService.getToken();

              // 如果新的 Access Token 存在，則將其添加到原始請求中，並重新發送請求
              if (newToken) {
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`, // 設置新的 Authorization 標頭
                  },
                });
              }

              // 使用更新後的請求繼續處理
              return next.handle(request);
            })
          );
        }

        // 如果錯誤不是 401 或者是 refresh-token 請求的錯誤，則直接將錯誤拋出
        return throwError(() => error);
      })
    );
  }
}
