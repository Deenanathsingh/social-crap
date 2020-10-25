import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StorageUtil, KEY } from '../util/StorageUtil';
import { BaseResponse } from '../model/base-response';
import { CompleteUser } from '../model/complete-user';
import { Check } from '../util/ChecksUtil';

@Injectable({
    providedIn: 'root',
})
export class CommonService {

    getLoggedInUser(apiService: ApiService) {
        const token = StorageUtil.restore(KEY.TOKEN);
        let user: CompleteUser;
        if (!Check.isEmptyObject(token)) {
            apiService.getCompleteUser(token).subscribe(
                (data: BaseResponse<CompleteUser>) => {
                    if (!data.error) {
                        user = data.data;
                        return user;
                    }
                },
                (error) => {
                    const data: BaseResponse<CompleteUser> = error.error;
                    alert("ERROR CODE" + data.error + "MESSAGE:" + data.message);
                }
            );
        }
    }

}