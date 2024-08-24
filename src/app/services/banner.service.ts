import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private backendUrl = `${environment.backendUrl}/banners`;

  constructor(private http: HttpClient) {}

  getAllBanners(): Observable<any> {
    return this.http.get<any>(this.backendUrl);
  }
}
