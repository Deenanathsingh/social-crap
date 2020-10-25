import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Check } from '../util/ChecksUtil';
import { StorageUtil } from '../util/StorageUtil';
import { CompleteUser } from '../model/complete-user';
import { BaseResponse } from '../model/base-response';
import { UserWrap } from '../model/user-wrap-model';
import { FriendRequest } from '../model/friend-request';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user: CompleteUser;
  results: UserWrap[] = [];
  friends: UserWrap[] = [];
  searchTerm: string;
  token: string;
  pendingFriendRequests: UserWrap[] = [];
  friendRequests: UserWrap[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    Check.isUserLoggedIn(this.apiService, this.router);
    this.token = StorageUtil.getToken();
    this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
      if (!data.error) {
        this.user = data.data;
        if (!Check.isEmptyCollection(this.user.friends)) {
          this.friends = this.user.friends;
        }
        if (!Check.isEmptyCollection(this.user.friendRequests)) {
          this.friendRequests = this.user.friendRequests;
        }
        this.getPendingFriends();
      }
    });
  }
  ngOnInit() {
  }

  search() {
    if (!Check.isEmptyObject(this.searchTerm)) {
      this.apiService.searchFriends(this.searchTerm, this.user.id).subscribe(
        (data: BaseResponse<UserWrap[]>) => {
          this.results = data.data;
          this.getPendingFriends();
          console.log("search Called");
        }
      );
    }
  }

  sendFriendRequest(friendId: number) {
    const friendRequest = new FriendRequest(this.user.id, friendId);
    this.apiService.sendFriendRequest(friendRequest).subscribe(
      (data: BaseResponse<number>) => {
        if (!data.error) {
          this.search();
        }
      });
  }

  refreshData() {
    this.apiService.getCompleteUser(this.token).subscribe(
      (data: BaseResponse<CompleteUser>) => {
        if (!data.error) {
          this.user = data.data;
          this.friends = this.user.friends;
          this.getPendingFriends();
        }
      }
    );
  }

  isAFriend(userId: number) {
    let res = false;
    if (this.friends) {
      this.friends.forEach(friend => {
        if (friend.userId == userId) {
          res = true;
        }
      });
    }
    return res;
  }

  unFriend(friendId: number) {
    const friendRequest = new FriendRequest(this.user.id, friendId);
    this.apiService.unFriend(friendRequest).subscribe(
      (data: BaseResponse<number>) => {
        if (!data.error) {
          this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
            if (!data.error) {
              this.user = data.data;
              this.friends = this.user.friends;
              this.friendRequests = this.user.friendRequests;
              this.getPendingFriends();
            }
          });
        }
      });
    this.search();
  }

  getPendingFriends() {
    this.apiService.getPendingFriends(this.user.id).subscribe(
      (data: BaseResponse<UserWrap[]>) => {
        if (!data.error) {
          this.pendingFriendRequests = data.data;
        }
      });
  }

  isRequestAlreadySent(userId: number) {
    let res = false;
    if (this.pendingFriendRequests) {
      this.pendingFriendRequests.forEach(friend => {
        if (friend.userId === userId) {
          res = true;
        }
      });
    }
    return res;
  }

  isFriendRequestRecieved(userId: number) {
    let res = false;
    if (this.friendRequests) {
      this.friendRequests.forEach(request => {
        if (request.userId === userId) {
          res = true;
        }
      });
    }
    return res;
  }

  confirmFriendRequest(requestId: number) {
    this.apiService.confirmFriendRequest(requestId).subscribe(
      (data) => {
        if (!data.error) {
          this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
            if (!data.error) {
              this.user = data.data;
              this.friends = this.user.friends;
              this.friendRequests = this.user.friendRequests;
              this.getPendingFriends();
            }
          });
        }
      });
    this.search();
  }

}
