import { StorageUtil, KEY } from './StorageUtil';
import { ApiService } from '../api/api.service';
import { BaseResponse } from '../model/base-response';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { CompleteUser } from '../model/complete-user';

export class Check {

    static isEmptyObject(data: any) {
        return data === null || data === undefined || data === '';
    }

    static isEmptyCollection(data: any[]) {
        return data === null || data === undefined || data.length === 0;
    }

    static authenticateUser(apiService: ApiService, router: Router) {
        const token = StorageUtil.restore(KEY.TOKEN);
        if (!this.isEmptyObject(token)) {
            apiService.getCompleteUser(token).subscribe(
                (data: BaseResponse<CompleteUser>) => {
                    if (!data.error) {
                        const user = data.data;
                        if (user.role.role == "ADMIN") {
                            router.navigate(['/index']);
                            return;
                        }
                        router.navigate(['/']);
                        return;
                    } else {
                        router.navigate(['/index']);
                        return;
                    }
                }
            );
        }
    }

    static isUserLoggedIn(apiService: ApiService, router: Router) {
        const token = StorageUtil.restore(KEY.TOKEN);
        if (this.isEmptyObject(token)) {
            router.navigate(['/index']);
        }
        apiService.getCompleteUser(token).subscribe(
            (data: BaseResponse<CompleteUser>) => {
                if (data.error) {
                    router.navigate(['/index']);
                } else {
                    const user = data.data;
                    if (user.role.role == "ADMIN") {
                        router.navigate(['/index']);
                    }
                }
            }
        );
    }

    static authenticateAdmin(apiService: ApiService, router: Router) {
        const token = StorageUtil.restore(KEY.TOKEN);
        if (!this.isEmptyObject(token)) {
            apiService.getCompleteUser(token).subscribe(
                (data: BaseResponse<CompleteUser>) => {
                    if (!data.error) {
                        const user = data.data;
                        if (user.role.role == "USER") {
                            router.navigate(['/admin/login']);
                            return;
                        }
                        router.navigate(['/admin/dashboard']);
                        return;
                    } else {
                        router.navigate(['/admin/login']);
                        return;
                    }
                }
            );
        }
    }

    static isAdminLoggedIn(apiService: ApiService, router: Router) {
        const token = StorageUtil.restore(KEY.TOKEN);
        if (this.isEmptyObject(token)) {
            router.navigate(['/admin/login']);
        }
        apiService.getCompleteUser(token).subscribe(
            (data: BaseResponse<CompleteUser>) => {
                if (data.error) {
                    router.navigate(['/admin/login']);
                } else {
                    const user = data.data;
                    if (user.role.role == "USER") {
                        router.navigate(['/admin/login']);
                    }
                }
            }
        );
    }

}