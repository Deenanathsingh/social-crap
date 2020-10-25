export class NotificationRequest {

    notification: string;
    sentTo: number[];

    constructor(notification: string, sentTo: number[]) {
        this.notification = notification;
        this.sentTo = sentTo;
    }

}