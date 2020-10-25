import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Check } from 'src/app/util/ChecksUtil';
import { StorageUtil } from 'src/app/util/StorageUtil';
import { BaseResponse } from 'src/app/model/base-response';
import { Post } from 'src/app/model/post-model';
import { PaginationResponse } from 'src/app/model/pagination-response-model';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css']
})
export class ManagePostsComponent implements OnInit {

  token: string;
  posts: Post[];
  post: Post;

  constructor(private router: Router, private apiService: ApiService) {
    Check.isAdminLoggedIn(this.apiService, this.router);
    this.token = StorageUtil.getToken();
    this.refreshData();
  }

  ngOnInit() {
  }

  refreshData() {
    this.apiService.getAllPost(this.token,StorageUtil.getOffset(), StorageUtil.getLimit()).subscribe(
      (data: PaginationResponse<Post[]>) => {
        if (!data.error) {
          console.log(data);
          this.posts = data.data;
          console.log(this.posts);
        }
      });
  }

  setPost(post: Post) {
    this.post = post;
  }

  activateAndDeactivatePost() {
    this.apiService.activateAndDeactivatePost(this.post.id).subscribe(
      (data: BaseResponse<boolean>) => {
        if (!data.error) {
          if (data.data) {
            console.log("Deactivated");
            this.refreshData();
          }
        }
      });
  }

}
