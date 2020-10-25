import { UserWrap } from './user-wrap-model';

export class Like {
    numberOfLikes: number;
    numberOfDisLikes: number;
    likedBy: UserWrap[];
    disLikedBy: UserWrap[];
}