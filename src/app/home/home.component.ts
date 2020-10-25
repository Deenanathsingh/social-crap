import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Check } from '../util/ChecksUtil';
import { StorageUtil, KEY } from '../util/StorageUtil';
import { CompleteUser } from '../model/complete-user';
import { BaseResponse } from '../model/base-response';
import { Upload } from '../model/upload-model';
import { SavePost } from '../model/save-post';
import { NgForm } from '@angular/forms';
import { Post } from '../model/post-model';
import { UserWrap } from '../model/user-wrap-model';
import { LikeRequest } from '../model/like-request';
import { FriendRequest } from '../model/friend-request';
import { AddComment } from '../model/add-comment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    token: string;
    user: CompleteUser;
    selectedFile: File = null;
    upload: Upload;
    posts: Post[];
    tags: UserWrap[] = [];
    searchedUsers: UserWrap[];
    upcomingBirthdays: CompleteUser[] = [];
    friendSuggestions: UserWrap[] = [];
    interval: any;

    dp: string = "../assets/img/example.png";

    constructor(private router: Router, private apiService: ApiService) {
        Check.isUserLoggedIn(this.apiService, this.router);
        this.token = StorageUtil.getToken();
        this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
            if (!data.error) {
                this.user = data.data;
                if (this.user.profilePic) {
                    this.dp = this.user.profilePic;
                } else {
                    if (this.user.about.gender == "male") {
                        this.dp = "../assets/img/male-avatar.png";
                    }
                    if (this.user.about.gender == "female") {
                        this.dp = "../assets/img/female-avatar.png";
                    }
                }
                if (this.user) {
                    this.apiService.getUpcomingBirthdays(this.user.id).subscribe(
                        (data: BaseResponse<CompleteUser[]>) => {
                            if (!data.error) {
                                console.log(data);
                                this.upcomingBirthdays = data.data;
                            }
                        }
                    );
                    this.apiService.getCustomPost(this.user.id).subscribe(
                        (data: BaseResponse<Post[]>) => {
                            this.posts = data.data;
                            console.log(this.posts);
                        }
                    );
                    this.getFriendSuggestions();
                }
                console.log(this.user)
            }
        });
    }

    ngOnInit() {
        // this.refreshData();
        // this.interval = setInterval(() => {
        //     this.refreshData();
        // }, 1000);
    }

    uploadProfilePhoto(event) {
        this.selectedFile = <File>event.target.files[0];
        this.apiService.uploadProfilePic(this.user.id, this.selectedFile).subscribe(
            (data: BaseResponse<boolean>) => {
                if (!data.error) {
                    this.apiService.getCompleteUser(this.token).subscribe(
                        (data: BaseResponse<CompleteUser>) => {
                            this.user = data.data;
                            this.dp = this.user.profilePic;
                        }
                    );
                }
            }
        );
    }

    uploadFile(event) {
        this.selectedFile = <File>event.target.files[0];
        this.apiService.uploadFile(this.selectedFile).subscribe(
            (data: BaseResponse<Upload>) => {
                this.upload = data.data;
            }
        );
    }

    removeUpload() {
        this.upload = null;
    }

    publishPost(form: NgForm) {
        const value = form.value;
        console.log(value);
        const savePost = new SavePost(this.user.id, value.post, this.upload, this.tags);
        this.apiService.savePost(savePost).subscribe(
            (data: BaseResponse<number>) => {
                if (!data.error) {
                    this.apiService.getCustomPost(this.user.id).subscribe(
                        (data: BaseResponse<Post[]>) => {
                            this.posts = data.data;
                        }
                    );
                }
            }
        );
    }

    searchUser(event) {
        console.log(event);
        let keyword: string = event.data;
        this.apiService.searchUser(keyword, this.user.id).subscribe(
            (data: BaseResponse<UserWrap[]>) => {
                this.searchedUsers = data.data;
            }
        );
    }

    addTag(tag: UserWrap) {
        this.tags.push(tag);
    }

    removeTag(tag: UserWrap) {
        const index: number = this.tags.indexOf(tag);
        if (index !== -1) {
            this.tags.splice(index, 1);
        }
    }

    likePost(postId: number) {
        const likeRequest = new LikeRequest(postId, this.user.id);
        this.apiService.likePost(likeRequest).subscribe(
            (data: BaseResponse<boolean>) => {
                if (!data.error) {
                    this.apiService.getCustomPost(this.user.id).subscribe(
                        (data: BaseResponse<Post[]>) => {
                            this.posts = data.data;
                        }
                    );
                }
            }
        );
    }

    sendFriendRequest(friendId: number) {
        const friendRequest = new FriendRequest(this.user.id, friendId);
        this.apiService.sendFriendRequest(friendRequest).subscribe(
            (data: BaseResponse<number>) => {
                if (!data.error) {
                    this.getFriendSuggestions();
                }
            });
    }

    addComment(form: NgForm, postId: number) {
        const value = form.value;
        console.log(value);
        const addComment = new AddComment(this.user.id, postId, value.comment);
        this.apiService.addComment(addComment).subscribe(
            (data: BaseResponse<number>) => {
                if (!data.error) {
                    this.apiService.getCustomPost(this.user.id).subscribe(
                        (data: BaseResponse<Post[]>) => {
                            this.posts = data.data;
                        }
                    );
                }
            }
        );
    }

    refreshData() {
        this.token = StorageUtil.getToken();
        this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
            if (!data.error) {
                this.user = data.data;
                this.posts = this.user.posts;
                if (this.user.profilePic) {
                    this.dp = this.user.profilePic;
                }
                if (this.user) {
                    this.apiService.getUpcomingBirthdays(this.user.id).subscribe(
                        (data: BaseResponse<CompleteUser[]>) => {
                            if (!data.error) {
                                console.log(data);
                                this.upcomingBirthdays = data.data;
                            }
                        }
                    );
                    this.apiService.getFriendSuggestions(this.user.id).subscribe(
                        (data: BaseResponse<UserWrap[]>) => {
                            if (!data.error) {
                                console.log(data);
                                this.friendSuggestions = data.data;
                            }
                        }
                    );
                }
                console.log(this.user)
            }
        });
    }

    isLiked(postId: number) {
        let res = false;
        if (this.posts) {
            this.posts.forEach(post => {
                if (post.id === postId) {
                    if (post.likesAndDisLikes) {
                        if (post.likesAndDisLikes.likedBy) {
                            post.likesAndDisLikes.likedBy.forEach(user => {
                                if (user.userId === this.user.id) {
                                    res = true;
                                }
                            })
                        }
                    }
                }
            })
        }
        return res;
    }

    getFriendSuggestions() {
        this.apiService.getFriendSuggestions(this.user.id).subscribe(
            (data: BaseResponse<UserWrap[]>) => {
                if (!data.error) {
                    console.log(data);
                    this.friendSuggestions = data.data;
                }
            }
        );
    }

}