export class FriendRequest {
    private userId: number;
    private friendId: number;

    constructor(userId: number, friendId: number) {
        this.userId = userId;
        this.friendId = friendId;
    }

}