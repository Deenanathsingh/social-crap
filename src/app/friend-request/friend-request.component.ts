import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Check } from '../util/ChecksUtil';
import { StorageUtil } from '../util/StorageUtil';
import { BaseResponse } from '../model/base-response';
import { CompleteUser } from '../model/complete-user';
import { UserWrap } from '../model/user-wrap-model';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  user: CompleteUser;
  token: string;
  friendRequests: UserWrap[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    Check.isUserLoggedIn(this.apiService, this.router);
    this.token = StorageUtil.getToken();
    this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
      if (!data.error) {
        this.user = data.data;
        this.friendRequests = this.user.friendRequests;
      }
    });
  }

  ngOnInit() {
  }

  confirmFriendRequest(requestId: number) {
    this.apiService.confirmFriendRequest(requestId).subscribe(
      (data) => {
        if (!data.error) {
          this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
            if (!data.error) {
              this.user = data.data;
              this.friendRequests = this.user.friendRequests;
            }
          });
        }
      });
  }


}
