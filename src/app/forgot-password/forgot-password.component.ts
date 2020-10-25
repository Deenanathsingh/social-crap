import { Component, OnInit } from '@angular/core';
import { BaseResponse } from '../model/base-response';
import { Check } from '../util/ChecksUtil';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { UserRecovery } from '../model/User-recovery';
import { Answer } from '../model/answer-model';
import { Password } from '../model/password-reset-model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  ok: boolean = false;
  verified: boolean = false;
  email: string;
  user: number;
  q1: string = null;
  q2: string = null;

  constructor(private router: Router, private apiService: ApiService) {

  }

  ngOnInit() {
  }

  recover(form: NgForm) {
    const value = form.value;
    this.email = value.user;
    if (Check.isEmptyObject(this.email)) {
      alert("Email or mobile cannot be blank!");
      return;
    }
    if (!Check.isEmptyObject(this.email)) {
      this.apiService.recoverUser(this.email).subscribe(
        (data: BaseResponse<UserRecovery>) => {
          if (!data.error) {
            const recovery: UserRecovery = data.data;
            if (!Check.isEmptyObject(recovery)) {
              this.q1 = recovery.firstQuestion;
              this.q2 = recovery.secondQuestion;
              this.ok = true;
            }
          }
        },
        (error) => {
          const data: BaseResponse<UserRecovery> = error.error;
          if (data.error) {
            alert(data.message);
          }
        }
      );
    }
  }

  answer(form: NgForm) {
    const value = form.value;
    if (Check.isEmptyObject(value.firstAnswer)) {
      alert("Answer cannot be blank!");
      return;
    }
    if (Check.isEmptyObject(value.secondAnswer)) {
      alert("Answer cannot be blank!");
      return;
    }
    const answer = new Answer(value.firstAnswer, value.secondAnswer);
    this.apiService.answer(this.email, answer).subscribe(
      (data: BaseResponse<number>) => {
        if (!data.error) {
          this.user = data.data;
          this.verified = true;
        }
      });
  }

  resetPassword(form: NgForm) {
    const value = form.value;
    if (value.password != value.confirm) {
      alert("Password and confirm password do not match. Try again!");
      return;
    }
    const request = new Password(value.password, null);
    this.apiService.resetPassword(this.user, request).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          if (data.data) {
            alert("Password changed successfully. Continue login!");
            this.router.navigate(['/login']);
            this.ok = false;
            this.verified = false;
          }
        }
      });
  }
}
