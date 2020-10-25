import { BaseModel } from './base-model';
import { About } from './about-model';
import { Address } from './address-model';
import { UserWrap } from './user-wrap-model';
import { Notification } from './notification-model';
import { Role } from './role-model';
import { Post } from './post-model';
import { RecoveryOptions } from './recovery-options-model';

export class CompleteUser extends BaseModel {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    profilePic: string;
    coverPhoto: string;
    about: About;
    address: Address;
    followers: UserWrap[];
    notifications: Notification[];
    role: Role;
    friends: UserWrap[];
    friendRequests: UserWrap[];
    posts: Post[];
    recoveryDetails: RecoveryOptions;
    status: string;
    blocked: boolean;
}