// src/app/top-bar/top-bar.component.ts

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  selectedLanguage = 'zh-TW';
  user$: Observable<any>;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    // 設置默認語言
    this.translate.setDefaultLang('zh-TW');
    this.translate.use(this.selectedLanguage);

    // 檢查用戶是否已登錄，並訂閱用戶狀態
    this.user$ = this.authService.getUser();
    console.log('this.user => ', this.user$);
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(this.selectedLanguage);
  }

  logout() {
    this.authService.logout();
  }

  goToFaq() {
    this.router.navigate(['/faq']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/user-profile']);
  }
}
