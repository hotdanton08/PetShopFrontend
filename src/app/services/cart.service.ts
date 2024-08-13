// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private backendUrl = `${environment.backendUrl}/carts`;

  constructor(private http: HttpClient) {}

  getCartByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/${userId}`);
  }

  deleteCartItem(cartItemId: number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/cart-item/${cartItemId}`);
  }
}
