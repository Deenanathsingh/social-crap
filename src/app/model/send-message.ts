export class SendMessage {
    private sentBy: number;
    private sentTo: number;
    private message: string;

    constructor(sentBy:number,sentTo:number,message:string){
        this.sentBy = sentBy;
        this.sentTo = sentTo;
        this.message = message;
    }
}