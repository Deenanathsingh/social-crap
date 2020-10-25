export class TicketRequest {

    title: string;
    issue: string;
    attachments: string[];
    type: string;
    sentBy: number;

    constructor(title: string, issue: string, attachments: string[], type: string, sentBy: number) {
        this.title = title;
        this.issue = issue;
        this.attachments = attachments;
        this.type = type;
        this.sentBy = sentBy;
    }

}