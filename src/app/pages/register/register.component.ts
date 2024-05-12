import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  hide = true;  // 用於密碼可視化切換
  hideConfirm = true;  // 用於確認密碼可視化切換

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    // 初始化第一個表單組，包含電子郵件、密碼和確認密碼
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatcher });

    // 初始化第二個表單組，包含驗證碼輸入
    this.secondFormGroup = this._formBuilder.group({
      verificationCode: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }

  // 自定義驗證器來確保密碼和確認密碼匹配
  passwordMatcher(group: FormGroup): { [key: string]: boolean } | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');
    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return password === confirmPassword ? null : { 'mismatch': true };
    }
    return null;
  }

  // 用於處理重寄驗證碼的事件
  resendCode() {
    // 實際的重寄驗證碼邏輯在這裡實現
    console.log('Resending verification code...');
    // 可以添加 API 調用來處理重寄驗證碼
  }

  // 用於處理最終提交的事件
  submitAll() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      console.log('Registration data:', {
        email: this.firstFormGroup.value.email,
        password: this.firstFormGroup.value.password,
        verificationCode: this.secondFormGroup.value.verificationCode
      });
      // 這裡可以添加 API 調用來提交所有註冊資料
    } else {
      console.log('Form is not valid.');
    }
  }
}
