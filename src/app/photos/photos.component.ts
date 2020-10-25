import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Check } from '../util/ChecksUtil';
import { StorageUtil } from '../util/StorageUtil';
import { BaseResponse } from '../model/base-response';
import { CompleteUser } from '../model/complete-user';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  user: CompleteUser;
  photos: string[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    Check.isUserLoggedIn(this.apiService, this.router);
    const token = StorageUtil.getToken();
    this.apiService.getCompleteUser(token).subscribe((data: BaseResponse<CompleteUser>) => {
      if (!data.error) {
        this.user = data.data;
        if (!Check.isEmptyObject(this.user)) {
          this.apiService.getUserPhotos(this.user.id).subscribe(
            (data: BaseResponse<string[]>) => {
              this.photos = data.data;
            });
        }
      }
    });

  }

  ngOnInit() {
  }

}
