// src/app/services/product-detail.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  private backendUrl = `${environment.backendUrl}/productDetails`;

  constructor(private http: HttpClient) {}

  getProductDetailById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/${productId}`);
  }

  getAllProductDetail(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}`);
  }
}
