import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string;
  hide = true;

  constructor(private router: Router) {}

  login() {
    if (this.email && this.password) {
      console.log('Login data:', { email: this.email, password: this.password });
      // 模擬 API 請求處理登入
    }
  }

  openForgotPasswordDialog() {
    // 打開忘記密碼對話框
    console.log('Open forgot password dialog');
    // 實際的忘記密碼對話框實現將需要更多的邏輯和可能的額外組件
  }

  navigateToRegister() {
    // 導航到註冊頁面
    this.router.navigate(['/register']);
  }
}
