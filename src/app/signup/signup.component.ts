import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterUser } from '../model/register-user.model';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { BaseResponse } from '../model/base-response';
import { StorageUtil } from '../util/StorageUtil';
import { About } from '../model/about-model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signUpService: ApiService, private router: Router) {
  }

  ngOnInit() {
    StorageUtil.logout();
  }

  signUp(form: NgForm) {
    const value = form.value;
    let about = new About();
    about.setDob(value.dob);
    about.setGender(value.gender);
    const user = new RegisterUser(value.firstName, value.lastName, value.email, value.gender, value.dob, value.password, about);
    this.signUpService.addUser(user).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          alert("Successfully Registered")
          this.router.navigate(['/login']);
        }
      },
      (error) => { console.log(error); }
    );
  }

}