import { BaseModel } from './base-model';
import { Upload } from './upload-model';
import { UserWrap } from './user-wrap-model';
import { Like } from './like-model';

export class Post extends BaseModel {
    title: string;
    post: string;
    upload: Upload;
    user: UserWrap;
    likesAndDisLikes: Like;
    comments: Comment[];
    tags: UserWrap;
}