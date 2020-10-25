import { BaseModel } from './base-model';
import { UserWrap } from './user-wrap-model';

export class ChatResponse extends BaseModel {

    message: string;
    sentBy: UserWrap;
    sentTo: UserWrap;

}