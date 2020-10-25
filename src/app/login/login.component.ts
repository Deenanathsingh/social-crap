import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUser } from '../model/login-user.model';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { ApiService } from '../api/api.service';
import { BaseResponse } from '../model/base-response';
import { Check } from '../util/ChecksUtil';
import { StorageUtil, KEY } from '../util/StorageUtil';
import { CompleteUser } from '../model/complete-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) {
    Check.authenticateUser(this.apiService, this.router);
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    const value = form.value;
    const user = new LoginUser(value.user, value.password);
    this.apiService.loginUser(user).subscribe(
      (data: BaseResponse<User>) => {
        if (!data.error) {
          const userResponse: User = data.data;
          sessionStorage.setItem(KEY.TOKEN, userResponse.token);
          if (!Check.isEmptyObject(userResponse.token)) {
            this.apiService.getCompleteUser(userResponse.token).subscribe(
              (data: BaseResponse<CompleteUser>) => {
                const user = data.data;
                if (!Check.isEmptyObject(user)) {
                  StorageUtil.store(KEY.USER, JSON.stringify(user));
                  this.router.navigate(['/']);
                }
              });
          }
        }
      },
      (error) => {
        const data: BaseResponse<User> = error.error;
        if (data.error) {
          alert(data.message);
        }
      }
    );
  }

}
