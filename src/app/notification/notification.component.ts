import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Check } from '../util/ChecksUtil';
import { StorageUtil } from '../util/StorageUtil';
import { BaseResponse } from '../model/base-response';
import { CompleteUser } from '../model/complete-user';
import { Notification } from '../model/notification-model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  user: CompleteUser;
  notifications: Notification[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    Check.isUserLoggedIn(this.apiService, this.router);
    const token = StorageUtil.getToken();
    this.apiService.getCompleteUser(token).subscribe((data: BaseResponse<CompleteUser>) => {
      if (!data.error) {
        this.user = data.data;
        this.apiService.getAllNotifications(this.user.id).subscribe(
          (data: BaseResponse<Notification[]>) => {
            if (!data.error) {
              this.notifications = data.data;
            }
          }
        );
      }
    });
  }

  ngOnInit() {
  }

}
