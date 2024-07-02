import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  selectedLanguage = 'zh-TW';

  constructor(private translate: TranslateService) {
    // 設置默認語言
    this.translate.setDefaultLang('zh-TW');
    this.translate.use(this.selectedLanguage);
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(this.selectedLanguage);
  }
}
