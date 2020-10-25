import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { NgForm } from '@angular/forms';
import { LoginUser } from 'src/app/model/login-user.model';
import { User } from 'src/app/model/user.model';
import { BaseResponse } from 'src/app/model/base-response';
import { Check } from 'src/app/util/ChecksUtil';
import { CompleteUser } from 'src/app/model/complete-user';
import { StorageUtil, KEY } from 'src/app/util/StorageUtil';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) {
    Check.authenticateAdmin(this.apiService, this.router);
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    const value = form.value;
    const user = new LoginUser(value.user, value.password);
    this.apiService.loginAdmin(user).subscribe(
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
                  this.router.navigate(['/admin/dashboard']);
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
