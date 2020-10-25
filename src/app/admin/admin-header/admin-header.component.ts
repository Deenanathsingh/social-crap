import { Component, OnInit } from '@angular/core';
import { StorageUtil } from 'src/app/util/StorageUtil';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout() {
    StorageUtil.logout();
    window.location.reload();
  }

}
