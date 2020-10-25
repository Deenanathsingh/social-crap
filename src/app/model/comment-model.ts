import { BaseModel } from './base-model';
import { Like } from './like-model';
import { UserWrap } from './user-wrap-model';

export class Comment extends BaseModel {
    comment: string;
    user: UserWrap;
    likeAndDisLikes: Like;
}