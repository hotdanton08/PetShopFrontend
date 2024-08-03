import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

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
      password: ['', [Validators.required]],
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
    console.log('onChangePasswordSubmit');
    if (this.changePasswordForm.valid) {
      const passwordData = this.changePasswordForm.getRawValue();
      console.log(passwordData);
      this.userService.changeUserPassword(passwordData).subscribe((error) => {
        console.error('Error updating password:', error);
      });
    }
  }

  // 驗證密碼是否匹配
  get passwordsMatch() {
    return (
      this.userProfileForm.get('password')?.value ===
      this.userProfileForm.get('confirmPassword')?.value
    );
  }

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
