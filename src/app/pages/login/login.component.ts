import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email!: string;
  password!: string;
  hide = true;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.email && this.password) {
      // 調用 AuthService 的 login 方法
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Login successful');
          this.router.navigate(['/home']); // 登錄成功後導航到首頁或其他頁面
        },
        error: (err) => {
          console.error('Login failed:', err);
          // 處理登錄失敗邏輯
        },
      });
    }
  }

  isPasswordValid(): boolean {
    // 簡單檢查密碼是否包含至少一個字母和一個數字
    const hasLetter = /[a-zA-Z]/.test(this.password);
    const hasNumber = /\d/.test(this.password);
    return hasLetter && hasNumber;
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
