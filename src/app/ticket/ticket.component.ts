import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Check } from '../util/ChecksUtil';
import { CompleteUser } from '../model/complete-user';
import { StorageUtil } from '../util/StorageUtil';
import { BaseResponse } from '../model/base-response';
import { TicketResponse } from '../model/ticket-model';
import { NgForm } from '@angular/forms';
import { TicketRequest } from '../model/ticket-request-model';
import { UpdateStatus } from '../model/update-status-model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  token: string;
  user: CompleteUser;
  tickets: TicketResponse[] = [];
  attachments: string[] = [];
  referenceId: number;
  selectedTicket: TicketResponse;

  constructor(private router: Router, private apiService: ApiService) {
    Check.isUserLoggedIn(this.apiService, this.router);
    this.token = StorageUtil.getToken();
    this.apiService.getCompleteUser(this.token).subscribe((data: BaseResponse<CompleteUser>) => {
      if (!data.error) {
        this.user = data.data;
        this.getTickets();
      }
    });
  }

  getTickets() {
    this.apiService.getAllTicketsByUser(this.user.id).subscribe(
      (data: BaseResponse<TicketResponse[]>) => {
        this.tickets = data.data;
        this.selectedTicket = this.tickets[0];
        console.log(this.tickets);
        console.log(this.selectedTicket);
      });
  }

  setTicket(ticketId: number) {
    this.referenceId = ticketId;
    this.getTicketById();
  }

  saveTicket(form: NgForm) {
    const value = form.value;
    const request = new TicketRequest(value.title, value.issue, this.attachments, null, this.user.id);
    this.apiService.saveTicket(request).subscribe((data: BaseResponse<number>) => {
      if (!data.error) {
        console.log("Ticket Created")
        this.getTickets();
      }
    });
  }

  getTicketById() {
    this.apiService.getTicketById(this.referenceId).subscribe(
      (data: BaseResponse<TicketResponse>) => {
        if (!data.error) {
          if (!Check.isEmptyObject(data.data)) {
            this.selectedTicket = data.data;
          }
        }
      });
  }

  reply(form: NgForm) {
    const value = form.value;
    const request = new UpdateStatus(value.remark, "OPEN", this.user.id, this.referenceId)
    this.apiService.updateStatus(request).subscribe((data: BaseResponse<boolean>) => {
      if (!data.error) {
        console.log("Status Updated");
        this.getTicketById();
      }
    }
    );
  }

  ngOnInit() {
  }

}
