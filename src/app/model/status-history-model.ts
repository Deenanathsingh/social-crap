import { BaseModel } from './base-model';
import { UserWrap } from './user-wrap-model';

export class StatusHistoryResponse extends BaseModel {
    remark: string;
    status: string;
    type: string;
    user: UserWrap;
}