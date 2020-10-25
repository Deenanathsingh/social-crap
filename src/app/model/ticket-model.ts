import { BaseModel } from './base-model';
import { UserWrap } from './user-wrap-model';
import { StatusHistoryResponse } from './status-history-model';

export class TicketResponse extends BaseModel {
    title: string;
    issue: string;
    attachments: string[];
    type: string;
    sentBy: UserWrap;
    currentStatus: StatusHistoryResponse;
    statusHistory: StatusHistoryResponse[];
}