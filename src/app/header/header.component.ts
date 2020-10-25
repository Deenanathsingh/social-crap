import { Component, OnInit } from '@angular/core';
import { BaseResponse } from '../model/base-response';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { CompleteUser } from '../model/complete-user';
import { StorageUtil, KEY } from '../util/StorageUtil';
import { Check } from '../util/ChecksUtil';
import { Notification } from '../model/notification-model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    user: CompleteUser;
    token: string;
    notifications: Notification[] = [];

    constructor(private router: Router, private apiService: ApiService) {
        Check.isUserLoggedIn(apiService, router);
        this.token = StorageUtil.getToken();
        this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
            if (!data.error) {
                this.user = data.data;
                if (!Check.isEmptyCollection(this.user.notifications)) {
                    this.notifications = this.user.notifications;
                }
            }
        });
    }

    ngOnInit() {

    }

    logout() {
        StorageUtil.logout();
        window.location.reload();
    }

    confirmFriendRequest(requestId: number) {
        console.log(requestId);
        this.apiService.confirmFriendRequest(requestId).subscribe(
            (data) => {
                if (!data.error) {
                    this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
                        if (!data.error) {
                            this.user = data.data;
                            if (!Check.isEmptyCollection(this.user.notifications)) {
                                this.notifications = this.user.notifications;
                            }
                        }
                    });
                }
            }
        );
    }

    clearAllNotifications() {
        this.apiService.clearAllNotification(this.user.id).subscribe(
            (data: BaseResponse<boolean>) => {
                if (!data.error) {
                    this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
                        if (!data.error) {
                            this.user = data.data;
                            console.log(this.user)
                        }
                    });
                }
            }
        );
    }

}