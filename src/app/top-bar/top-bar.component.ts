import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  selectedLanguage = 'zh-TW';
  user: any = null;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    // 設置默認語言
    this.translate.setDefaultLang('zh-TW');
    this.translate.use(this.selectedLanguage);

    // 檢查用戶是否已登錄
    this.user = this.authService.getUserFromToken();
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(this.selectedLanguage);
  }

  logout() {
    this.authService.logout();
    this.user = null;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/user-profile']);
  }
}
