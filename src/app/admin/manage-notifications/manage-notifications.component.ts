import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Check } from 'src/app/util/ChecksUtil';
import { StorageUtil } from 'src/app/util/StorageUtil';
import { BaseResponse } from 'src/app/model/base-response';
import { PaginationResponse } from 'src/app/model/pagination-response-model';
import { Notification } from 'src/app/model/notification-model';
import { UserWrap } from 'src/app/model/user-wrap-model';
import { CompleteUser } from 'src/app/model/complete-user';
import { NgForm } from '@angular/forms';
import { NotificationRequest } from 'src/app/model/notification-request-model';

@Component({
  selector: 'app-manage-notifications',
  templateUrl: './manage-notifications.component.html',
  styleUrls: ['./manage-notifications.component.css']
})
export class ManageNotificationsComponent implements OnInit {

  token: string;
  notifications: Notification[] = [];
  tags: UserWrap[] = [];
  sentTo: number[] = [];
  searchTerm: string;
  searchedUsers: UserWrap[] = [];
  user: CompleteUser;

  constructor(private router: Router, private apiService: ApiService) {
    Check.isAdminLoggedIn(this.apiService, this.router);
    this.token = StorageUtil.getToken();
    this.apiService.getCompleteUser(this.token).subscribe(
      (data: BaseResponse<CompleteUser>) => {
        if (!data.error) {
          this.user = data.data;
          this.getAllNotifications();
        }
      }
    );
  }

  ngOnInit() {
  }

  getAllNotifications() {
    this.apiService.getAllNotificationByAdmin(this.token, StorageUtil.getOffset(), StorageUtil.getLimit()).subscribe(
      (data: PaginationResponse<Notification[]>) => {
        if (!data.error) {
          this.notifications = data.data;
          console.log(this.notifications)
        }
      });
  }

  searchUser() {
    console.log(this.searchTerm);
    this.apiService.searchUser(this.searchTerm, this.user.id).subscribe(
      (data: BaseResponse<UserWrap[]>) => {
        this.searchedUsers = data.data;
      }
    );
  }

  addTag(tag: UserWrap) {
    this.tags.push(tag);
    this.sentTo.push(tag.userId);
  }

  removeTag(tag: UserWrap) {
    const index: number = this.tags.indexOf(tag);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  }

  sendNotification(form: NgForm) {
    const value = form.value;
    const request = new NotificationRequest(value.notification, this.sentTo);
    this.apiService.sendNotification(request, this.token).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          console.log("Notification Sent")
        }
      });
  }

}
