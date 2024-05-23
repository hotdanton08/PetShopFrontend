import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  email = 'user@example.com';  // 假資料

  constructor(private fb: FormBuilder) {
    this.userProfileForm = this.fb.group({
      email: [{ value: this.email, disabled: true }, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.userProfileForm.valid) {
      const { email, password } = this.userProfileForm.value;
      // 假設我們會使用這些數據進行API調用
      console.log(`Email: ${this.email}, Password: ${password}`);
    }
  }

  // 驗證密碼是否匹配
  get passwordsMatch() {
    return this.userProfileForm.get('password')?.value === this.userProfileForm.get('confirmPassword')?.value;
  }
}
