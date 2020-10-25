import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Check } from 'src/app/util/ChecksUtil';
import { StorageUtil } from 'src/app/util/StorageUtil';
import { BaseResponse } from 'src/app/model/base-response';
import { TicketResponse } from 'src/app/model/ticket-model';
import { NgForm } from '@angular/forms';
import { UpdateStatus } from 'src/app/model/update-status-model';
import { CompleteUser } from 'src/app/model/complete-user';
import { StatusHistoryResponse } from 'src/app/model/status-history-model';
import { PaginationResponse } from 'src/app/model/pagination-response-model';

@Component({
  selector: 'app-manage-tickets',
  templateUrl: './manage-tickets.component.html',
  styleUrls: ['./manage-tickets.component.css']
})
export class ManageTicketsComponent implements OnInit {

  token: string;
  tickets: TicketResponse[] = [];
  history: StatusHistoryResponse[] = [];
  adminId: number;
  selectedTicket: TicketResponse;
  user: CompleteUser;

  constructor(private router: Router, private apiService: ApiService) {
    Check.isAdminLoggedIn(this.apiService, this.router);
    this.token = StorageUtil.getToken();
    this.apiService.getCompleteUser(this.token).subscribe(
      (data: BaseResponse<CompleteUser>) => {
        if (!data.error) {
          this.user = data.data;
          this.getAllTickets();
        }
      }
    );
  }

  getAllTickets() {
    this.apiService.getAllTickets(this.token, "", StorageUtil.getOffset(), StorageUtil.getLimit()).subscribe(
      (data: PaginationResponse<TicketResponse[]>) => {
        this.tickets = data.data;
        console.log(this.tickets);
      });
  }

  getOpenTickets() {
    this.apiService.getAllTickets(this.token, "OPEN", StorageUtil.getOffset(), StorageUtil.getLimit()).subscribe(
      (data: PaginationResponse<TicketResponse[]>) => {
        this.tickets = data.data;
      });
  }

  getClosedTickets() {
    this.apiService.getAllTickets(this.token, "CLOSED", StorageUtil.getOffset(), StorageUtil.getLimit()).subscribe(
      (data: PaginationResponse<TicketResponse[]>) => {
        this.tickets = data.data;
      });
  }

  reply(form: NgForm) {
    const value = form.value;
    const request = new UpdateStatus(value.remark, value.status, this.user.id, this.selectedTicket.id)
    console.log(request);
    this.apiService.updateStatus(request).subscribe((data: BaseResponse<boolean>) => {
      if (!data.error) {
        console.log("Status Updated");
        this.getAllTickets();
      }
    }
    );
  }

  setTicket(ticket: TicketResponse) {
    this.selectedTicket = ticket;
    this.history = ticket.statusHistory;
    console.log(this.history);
  }

  ngOnInit() {
  }

}
