import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { About } from '../model/about-model';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Check } from '../util/ChecksUtil';
import { CompleteUser } from '../model/complete-user';
import { StorageUtil } from '../util/StorageUtil';
import { BaseResponse } from '../model/base-response';
import { User } from '../model/user.model';
import { Address } from '../model/address-model';
import { RecoveryOptions } from '../model/recovery-options-model';
import { Password } from '../model/password-reset-model';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  questions1: Array<string> = [
    "What was your childhood nickname?",
    "What is the name of your favorite childhood friend?",
    "What is the middle name of your oldest child?",
    "In what city or town did your mother and father meet?",
    "What is your favorite movie?",
    "What is your pet’s name?",
    "In what town was your first job?",
    "What was your favorite food as a child?"
  ];

  questions2: Array<string> = [
    "What was your childhood nickname?",
    "What is your pet’s name?",
    "What is the name of your favorite childhood friend?",
    "What is the middle name of your oldest child?",
    "In what city or town did your mother and father meet?",
    "What is your favorite movie?",
    "In what town was your first job?",
    "What was your favorite food as a child?"
  ];


  isProfile: boolean = true;
  isAbout: boolean = false;
  isAddress: boolean = false;
  isRecovery: boolean = false;
  isPassword: boolean = false;
  formDisable: boolean = true;

  user: CompleteUser;
  token: string;

  constructor(private router: Router, private apiService: ApiService) {
    Check.isUserLoggedIn(this.apiService, this.router);
    this.token = StorageUtil.getToken();
    this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
      if (!data.error) {
        this.user = data.data;
        if (!Check.isEmptyObject(this.user.recoveryDetails.firstQuestion)) {
          this.questions1.forEach(question => {
            if (question == this.user.recoveryDetails.firstQuestion) {
              this.questions1.splice(this.questions2.indexOf(question), 1);
            }
          });
        }
        if (!Check.isEmptyObject(this.user.recoveryDetails.secondQuestion)) {
          this.questions2.forEach(question => {
            if (question == this.user.recoveryDetails.secondQuestion) {
              this.questions2.splice(this.questions2.indexOf(question), 1);
            }
          });
        }
      }
    });

  }

  ngOnInit() {
  }

  getProfile() {
    this.isProfile = true;
    this.isAbout = false;
    this.isAddress = false;
    this.isRecovery = false;
    this.isPassword = false;
    this.refreshUser();
    this.formDisable = true;
  }

  getAbout() {
    this.isProfile = false;
    this.isAbout = true;
    this.isAddress = false;
    this.isRecovery = false;
    this.isPassword = false;
    this.refreshUser();
    this.formDisable = true;
  }

  getAddress() {
    this.isProfile = false;
    this.isAbout = false;
    this.isAddress = true;
    this.isRecovery = false;
    this.isPassword = false;
    this.refreshUser();
    this.formDisable = true;
  }

  getRecovery() {
    this.isProfile = false;
    this.isAbout = false;
    this.isAddress = false;
    this.isRecovery = true;
    this.isPassword = false;
    this.refreshUser();
    this.formDisable = true;
  }

  getPassword() {
    this.isProfile = false;
    this.isAbout = false;
    this.isAddress = false;
    this.isRecovery = false;
    this.isPassword = true;
    this.refreshUser();
    this.formDisable = true;
  }

  refreshUser() {
    this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
      if (!data.error) {
        this.user = data.data;
      }
    });
  }

  updateProfile(form: NgForm) {
    const value = form.value;
    let request = new User();
    request.setFirstName(value.firstName);
    request.setLastName(value.lastName);
    request.setEmail(value.email);
    request.setMobileNumber(value.mobileNumber);
    console.log(request);
    this.apiService.updateUser(this.user.id, request).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          this.refreshUser();
        }
      },
      (error) => {
        const data: BaseResponse<boolean> = error.error;
        if (data.error) {
          alert(data.message);
        }
      });
    this.formDisable = true;
  }

  updateAbout(form: NgForm) {
    const value = form.value;
    console.log(value);
    let request = new About();
    request.setBio(value.bio);
    request.setDob(value.dob);
    request.setGender(value.gender);
    request.setRelationShip(value.relationShip);
    console.log(request);
    this.apiService.updateAbout(this.user.id, request).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          this.refreshUser();
        }
      },
      (error) => {
        const data: BaseResponse<boolean> = error.error;
        if (data.error) {
          alert(data.message);
        }
      });
    this.formDisable = true;
  }

  updateAddress(form: NgForm) {
    const value = form.value;
    console.log(value);
    let request = new Address();
    request.setHouseNumber(value.houseNumber);
    request.setStreet(value.street);
    request.setArea(value.area);
    request.setCity(value.city);
    request.setState(value.state);
    request.setPinCode(value.pinCode);
    request.setCountry(value.country);
    console.log(request);
    this.apiService.updateAddress(this.user.id, request).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          this.refreshUser();
        }
      },
      (error) => {
        const data: BaseResponse<boolean> = error.error;
        if (data.error) {
          alert(data.message);
        }
      });
    this.formDisable = true;
  }

  updateRecoveryOptions(form: NgForm) {
    const value = form.value;
    console.log(value);
    const request = new RecoveryOptions(value.recoveryEmail, value.firstQuestion, value.firstAnswer, value.secondQuestion, value.secondAnswer);
    console.log(request);
    this.apiService.updateRecoveryOptions(this.user.id, request).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          this.refreshUser();
        }
      },
      (error) => {
        const data: BaseResponse<boolean> = error.error;
        if (data.error) {
          alert(data.message);
        }
      });
    this.formDisable = true;
  }

  changePassword(form: NgForm) {
    const value = form.value;
    if (value.newPassword != value.confirm) {
      alert("Password and confirm password do not match!");
      return;
    }
    const request = new Password(value.newPassword, value.oldPassword);
    this.apiService.changePassword(this.user.id, request).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          alert("Password changes successfully! Kindly Login Again...");
          StorageUtil.logout();
          Check.isUserLoggedIn(this.apiService, this.router);
        }
      },
      (error) => {
        const data: BaseResponse<boolean> = error.error;
        if (data.error) {
          alert(data.message);
        }
      });
    this.formDisable = true;
  }

  isMale() {
    return true;
  }

  enableForm() {
    this.formDisable = false;
  }

}
