import { Component, OnInit } from '@angular/core';
import { CompleteUser } from 'src/app/model/complete-user';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { Check } from 'src/app/util/ChecksUtil';
import { BaseResponse } from 'src/app/model/base-response';
import { User } from 'src/app/model/user.model';
import { StorageUtil } from 'src/app/util/StorageUtil';
import { NgForm } from '@angular/forms';
import { Admin } from 'src/app/model/admin-model';
import { About } from 'src/app/model/about-model';
import { RegisterUser } from 'src/app/model/register-user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  token: string;
  user: CompleteUser;

  dp: string = "../assets/img/male-avatar.png";

  constructor(private router: Router, private apiService: ApiService) {
    Check.isAdminLoggedIn(this.apiService, this.router);
    this.token = StorageUtil.getToken();
    this.apiService.getCompleteUser(this.token).subscribe(
      (data: BaseResponse<CompleteUser>) => {
        if (!data.error) {
          this.user = data.data;
          if (!Check.isEmptyObject(this.user)) {
            if (this.user.about) {
              if (this.user.about.gender == "female") {
                this.dp = "../assets/img/female-avatar.png"
              }
            }
          }
        }
      }
    );
  }

  ngOnInit() {
  }

  logout() {
    StorageUtil.logout();
    window.location.reload();
  }

  addAdmin(form: NgForm) {
    const value = form.value;
    let about = new About();
    about.setDob(value.dob);
    about.setGender(value.gender);
    const user = new RegisterUser(value.firstName, value.lastName, value.email, value.gender, value.dob, value.password, about);
    this.apiService.saveAdmin(user).subscribe(
      (data: BaseResponse<number>) => {
        if (!data.error) {
          alert("Successfully Registered");
        }
      },
      (error) => { console.log(error); }
    );
  }

}
