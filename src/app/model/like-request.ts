export class LikeRequest {
    private postId: number;
    private userId: number;

    constructor(postId: number, userId: number) {
        this.postId = postId;
        this.userId = userId;
    }
}