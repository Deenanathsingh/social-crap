import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Check } from '../util/ChecksUtil';
import { StorageUtil } from '../util/StorageUtil';
import { BaseResponse } from '../model/base-response';
import { CompleteUser } from '../model/complete-user';
import { FriendRequest } from '../model/friend-request';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  user: CompleteUser;
  token: string;

  constructor(private router: Router, private apiService: ApiService) {
    Check.isUserLoggedIn(this.apiService, this.router);
    this.token = StorageUtil.getToken();
    this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
      if (!data.error) {
        this.user = data.data;
      }
    });
  }

  ngOnInit() {
  }

  unFriend(friendId: number) {
    const friendRequest = new FriendRequest(this.user.id, friendId);
    this.apiService.unFriend(friendRequest).subscribe(
      (data: BaseResponse<number>) => {
        if (!data.error) {
          this.token = StorageUtil.getToken();
          this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
            if (!data.error) {
              this.user = data.data;
            }
          });
        }
      });
  }

}
