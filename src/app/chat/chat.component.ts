import { Component, OnInit } from '@angular/core';
import { CompleteUser } from '../model/complete-user';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { StorageUtil } from '../util/StorageUtil';
import { Check } from '../util/ChecksUtil';
import { BaseResponse } from '../model/base-response';
import { NgForm } from '@angular/forms';
import { SendMessage } from '../model/send-message';
import { ChatResponse } from '../model/chat-response';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: CompleteUser;
  chat: ChatResponse[] = [];
  chattingWith: number;
  interval: any;

  constructor(private router: Router, private apiService: ApiService) {
    Check.isUserLoggedIn(this.apiService, this.router);
    const token = StorageUtil.getToken();
    this.apiService.getCompleteUser(token).subscribe((data: BaseResponse<CompleteUser>) => {
      if (!data.error) {
        this.user = data.data;
        if (!Check.isEmptyCollection(this.user.friends)) {
          this.chattingWith = this.user.friends[0].userId;
          this.getChat(this.chattingWith);
        }
      }
    });
  }

  ngOnInit() {
    if (this.chattingWith) {
      this.interval = setInterval(() => {
        this.getChat(this.chattingWith);
      }, 1000);
    }
  }

  sendMessage(form: NgForm, sentTo: number) {
    const value = form.value;
    const request = new SendMessage(this.user.id, sentTo, value.message);
    console.log(request);
    this.apiService.sendMessage(request).subscribe(
      (data: BaseResponse<number>) => {
        if (!data.error) {
          this.apiService.getMessages(this.user.id, sentTo).subscribe(
            (data: BaseResponse<ChatResponse[]>) => {
              if (!data.error) {
                this.chat = data.data;
                console.log(this.chat);
              }
            }
          );
        }
      }
    );
  }

  getChat(friendId: number) {
    this.chattingWith = friendId;
    this.apiService.getMessages(this.user.id, friendId).subscribe(
      (data: BaseResponse<ChatResponse[]>) => {
        if (!data.error) {
          this.chat = data.data;
          console.log(this.chat);
        }
      });
  }

}
