import { BaseModel } from './base-model';
import { UserWrap } from './user-wrap-model';

export class Notification extends BaseModel {
    notification: string;
    sentTo: UserWrap;
    sentBy: UserWrap;
}