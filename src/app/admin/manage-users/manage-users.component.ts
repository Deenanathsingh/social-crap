import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { StorageUtil } from 'src/app/util/StorageUtil';
import { BaseResponse } from 'src/app/model/base-response';
import { CompleteUser } from 'src/app/model/complete-user';
import { Check } from 'src/app/util/ChecksUtil';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  token: string;
  users: CompleteUser[];
  user: CompleteUser;

  constructor(private router: Router, private apiService: ApiService) {
    Check.isAdminLoggedIn(this.apiService, this.router);
    this.token = StorageUtil.getToken();
    this.refreshData();
  }

  ngOnInit() {
  }

  refreshData() {
    this.apiService.getAllUser(this.token, StorageUtil.getOffset(), StorageUtil.getLimit()).subscribe(
      (data: BaseResponse<CompleteUser[]>) => {
        if (!data.error) {
          this.users = data.data;
          console.log(this.users);
        }
      });
  }

  activateAndDeactivateUser() {
    this.apiService.activateAndDeactivateUser(this.user.id).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          if (data.data) {
            console.log("Deactivated");
            this.refreshData();
          }
        }
      });
  }

  setUser(user: CompleteUser) {
    this.user = user;
    console.log(this.user);
  }

  blockAndUnblockUser() {
    this.apiService.blockAndUnblockUser(this.user.id).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          if (data.data) {
            console.log("Blocked");
            this.refreshData();
          }
        }
      });
  }

}
