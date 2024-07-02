import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  email = 'user@example.com';
  genders = ['男', '女', '其他'];
  days: number[] = [];
  months: number[] = [];
  years: number[] = [];
  showProfile = true; // 用於控制顯示的表單
  selected = 'profile';

  constructor(private fb: FormBuilder) {
    this.userProfileForm = this.fb.group({
      email: [{ value: this.email, disabled: true }, [Validators.required, Validators.email]],
      name: [''],
      gender: [''],
      day: [''],
      month: [''],
      year: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

    // 初始化日期選項
    this.days = Array.from({ length: 31 }, (_, i) => i + 1);
    this.months = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.userProfileForm.valid) {
      const { email, name, gender, day, month, year, password } = this.userProfileForm.value;
      // 假設我們會使用這些數據進行API調用
      console.log(`Email: ${email}, Name: ${name}, Gender: ${gender}, Birthday: ${year}-${month}-${day}, Password: ${password}`);
    }
  }

  onChangePasswordSubmit() {
    if (this.changePasswordForm.valid) {
      const { password, confirmPassword } = this.changePasswordForm.value;
      // 假設我們會使用這些數據進行API調用
      console.log(`Password: ${password}, Confirm Password: ${confirmPassword}`);
    }
  }

  // 驗證密碼是否匹配
  get passwordsMatch() {
    return this.userProfileForm.get('password')?.value === this.userProfileForm.get('confirmPassword')?.value;
  }

  get changePasswordMatch() {
    return this.changePasswordForm.get('password')?.value === this.changePasswordForm.get('confirmPassword')?.value;
  }

  // 切換顯示的表單
  toggleForm(showProfile: boolean) {
    this.showProfile = showProfile;
    this.selected = showProfile ? 'profile' : 'password';
  }
}
