import { Component, OnInit } from '@angular/core';
import { CompleteUser } from '../model/complete-user';
import { Upload } from '../model/upload-model';
import { UserWrap } from '../model/user-wrap-model';
import { Post } from '../model/post-model';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Check } from '../util/ChecksUtil';
import { StorageUtil } from '../util/StorageUtil';
import { BaseResponse } from '../model/base-response';
import { NgForm } from '@angular/forms';
import { SavePost } from '../model/save-post';
import { LikeRequest } from '../model/like-request';
import { AddComment } from '../model/add-comment';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  user: CompleteUser;
  upload: Upload;
  selectedFile: File = null;
  tags: UserWrap[] = [];
  photos: string[] = [];
  videos: string[] = [];
  posts: Post[] = [];
  searchTerm: string;
  token: string;

  searchedUsers: UserWrap[] = [];

  dp: string;
  cover: string;

  constructor(private router: Router, private apiService: ApiService) {
    Check.isUserLoggedIn(this.apiService, this.router);
    this.token = StorageUtil.getToken();
    this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
      if (!data.error) {
        this.user = data.data;
        if (!Check.isEmptyObject(this.user)) {
          this.posts = this.user.posts;
          if (this.user.profilePic) {
            this.dp = this.user.profilePic;
          }
          if (this.user.coverPhoto) {
            this.cover = this.user.coverPhoto;
          }
          this.apiService.getUserPhotos(this.user.id).subscribe(
            (data: BaseResponse<string[]>) => {
              this.photos = data.data;
              console.log(this.photos);
            });
          console.log(this.user)
        }
      }
    });
  }

  ngOnInit() {
  }

  uploadFile(event) {
    this.selectedFile = <File>event.target.files[0];
    this.apiService.uploadFile(this.selectedFile).subscribe(
      (data: BaseResponse<Upload>) => {
        this.upload = data.data;
      }
    );
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

  uploadCoverPhoto(event) {
    this.selectedFile = <File>event.target.files[0];
    this.apiService.uploadCoverPhoto(this.user.id, this.selectedFile).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          this.apiService.getCompleteUser(this.token).subscribe(
            (data: BaseResponse<CompleteUser>) => {
              this.user = data.data;
              this.cover = this.user.coverPhoto;
            }
          );
        }
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
          this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
            if (!data.error) {
              this.user = data.data;
              if (!Check.isEmptyObject(this.user)) {
                this.posts = this.user.posts;
              }
            }
          });
        }
      }
    );
  }

  searchUser() {
    console.log(this.searchTerm);
    this.apiService.searchUser(this.searchTerm, this.user.id).subscribe(
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
          this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
            if (!data.error) {
              this.user = data.data;
              if (!Check.isEmptyObject(this.user)) {
                this.posts = this.user.posts;
              }
            }
          });
        }
      }
    );
  }

  addComment(form: NgForm, postId: number) {
    const value = form.value;
    console.log(value);
    const addComment = new AddComment(this.user.id, postId, value.comment);
    this.apiService.addComment(addComment).subscribe(
      (data: BaseResponse<number>) => {
        if (!data.error) {
          this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
            if (!data.error) {
              this.user = data.data;
              if (!Check.isEmptyObject(this.user)) {
                this.posts = this.user.posts;
              }
            }
          });
        }
      }
    );
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


}
