import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  genders = ['男', '女', '其他'];
  showProfile = true; // 用於控制顯示的表單
  selected = 'profile';
  userId: string | null = null;
  hide = true;
  hideConfirm = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userProfileForm = this.fb.group({
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      userName: [''],
      gender: [''],
      birthday: [''],
    });

    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    if (this.userId) {
      this.userService.getUserProfile(this.userId).subscribe((data) => {
        this.userProfileForm.patchValue({
          email: data.email,
          userName: data.username,
          gender: data.gender,
          birthday: data.birthday,
        });
      });
    }
  }

  onSubmit() {
    if (this.userProfileForm.valid && this.userId) {
      const updatedUserData = this.userProfileForm.getRawValue();
      this.userService
        .updateUserProfile(this.userId, updatedUserData)
        .subscribe();
    }
  }

  onChangePasswordSubmit() {
    if (this.changePasswordForm.valid) {
      const passwordData = this.changePasswordForm.getRawValue();
      this.userService.changeUserPassword(passwordData).subscribe({
        next: (response) => {
          console.log('Password updated successfully');
        },
        error: (err) => {
          console.error('Error updating password:', err);
        },
      });
    }
  }

  // 驗證密碼是否包含至少一個字母和一個數字
  isPasswordValid(): boolean {
    const password = this.changePasswordForm.get('password')?.value || '';
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLetter && hasNumber;
  }

  // 驗證密碼是否匹配
  get changePasswordMatch() {
    return (
      this.changePasswordForm.get('password')?.value ===
      this.changePasswordForm.get('confirmPassword')?.value
    );
  }

  // 切換顯示的表單
  toggleForm(showProfile: boolean) {
    this.showProfile = showProfile;
    this.selected = showProfile ? 'profile' : 'password';
  }
}
