export class AddComment {

    private userId: number;
    private postId: number;
    private comment: string;

    constructor(userId: number, postId: number, comment: string) {
        this.userId = userId;
        this.postId = postId;
        this.comment = comment;
    }

}