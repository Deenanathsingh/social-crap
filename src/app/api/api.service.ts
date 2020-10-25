import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../model/login-user.model';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { USER_LOGIN, USER, USER_TOKEN, COMPLETE_USER_TOKEN, FILE_UPLOAD, UPLOAD_PHOTO, UPLOAD_VIDEO, UPLOAD_PROFILE_PIC, UPLOAD_COVER_PHOTO, POST, SEND_FRIEND_REQUEST, CONFIRM_FRIEND_REQUEST, USER_SEARCH, POST_LIKE, FRIEND_SEARCH, UPCOMING_BIRTHDAYS, FRIEND_SUGGESTIONS, COMMENT, CHAT, NOTIFICATION, NOTIFICATION_CLEAR_ALL, NOTIFICATION_ACTIVE, POST_CUSTOM, UN_FRIEND, PENDING_FRIEND, USER_RECOVERY, USER_ANSWER, USER_RESET_PASSWORD, USER_CHANGE_PASSWORD, USER_UPDATE_ABOUT, USER_UPDATE_ADDRESS, USER_UPDATE_RECOVERY_OPTIONS, ADMIN_LOGIN, ACTIVATE_DEACTIVATE_USER, BLOCK_UNBLOCK_USER, ACTIVATE_DEACTIVATE_POST, TICKET, TICKET_UPDATE_STATUS, TICKET_BY_USER, NOTIFICATION_BY_ADMIN, ADMIN } from '../global/global';
import { RegisterUser } from '../model/register-user.model';
import { BaseResponse } from '../model/base-response';
import { CompleteUser } from '../model/complete-user';
import { Upload } from '../model/upload-model';
import { SavePost } from '../model/save-post';
import { FriendRequest } from '../model/friend-request';
import { UserWrap } from '../model/user-wrap-model';
import { LikeRequest } from '../model/like-request';
import { AddComment } from '../model/add-comment';
import { SendMessage } from '../model/send-message';
import { ChatResponse } from '../model/chat-response';
import { Notification } from '../model/notification-model';
import { Post } from '../model/post-model';
import { UserRecovery } from '../model/user-recovery';
import { Answer } from '../model/answer-model';
import { Password } from '../model/password-reset-model';
import { About } from '../model/about-model';
import { Address } from '../model/address-model';
import { RecoveryOptions } from '../model/recovery-options-model';
import { PaginationResponse } from '../model/pagination-response-model';
import { TicketRequest } from '../model/ticket-request-model';
import { UpdateStatus } from '../model/update-status-model';
import { TicketResponse } from '../model/ticket-model';
import { NotificationRequest } from '../model/notification-request-model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

     headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
      
    requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(this.headerDict), 
      };

    constructor(private http: HttpClient) {
    }

    addUser(data: RegisterUser): Observable<BaseResponse<boolean>> {
        return this.http.post<BaseResponse<boolean>>(USER, data,this.requestOptions);
    }

    updateUser(userId: number, data: User): Observable<BaseResponse<boolean>> {
        return this.http.patch<BaseResponse<boolean>>(USER + "/" + userId, data);
    }

    loginUser(data: LoginUser): Observable<BaseResponse<User>> {
        return this.http.post<BaseResponse<User>>(USER_LOGIN, data);
    }

    activateAndDeactivateUser(userId: number): Observable<BaseResponse<boolean>> {
        return this.http.patch<BaseResponse<boolean>>(ACTIVATE_DEACTIVATE_USER + userId, null);
    }

    blockAndUnblockUser(userId: number): Observable<BaseResponse<boolean>> {
        return this.http.patch<BaseResponse<boolean>>(BLOCK_UNBLOCK_USER + userId, null);
    }

    getUser(token: string): Observable<BaseResponse<User>> {
        return this.http.get<BaseResponse<User>>(USER_TOKEN, { headers: new HttpHeaders({ 'token': token }) });
    }

    getAllUser(token: string, offset: number, limit: number): Observable<PaginationResponse<CompleteUser[]>> {
        return this.http.get<PaginationResponse<CompleteUser[]>>(USER + "?offset=" + offset + "&limit=" + limit, { headers: new HttpHeaders({ 'token': token }) });
    }

    getCompleteUser(token: string): Observable<BaseResponse<CompleteUser>> {
        return this.http.get<BaseResponse<CompleteUser>>(COMPLETE_USER_TOKEN, { headers: new HttpHeaders({ 'token': token }) });
    }

    getPendingFriends(userId: number): Observable<BaseResponse<UserWrap[]>> {
        return this.http.get<BaseResponse<UserWrap[]>>(PENDING_FRIEND + userId);
    }

    uploadFile(file: File): Observable<BaseResponse<Upload>> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<BaseResponse<Upload>>(FILE_UPLOAD, formData);
    }

    getUserPhotos(id: number): Observable<BaseResponse<string[]>> {
        return this.http.get<BaseResponse<string[]>>(UPLOAD_PHOTO + id);
    }

    getUserVideos(id: number): Observable<BaseResponse<string[]>> {
        return this.http.get<BaseResponse<string[]>>(UPLOAD_VIDEO + id);
    }

    uploadProfilePic(id: number, file: File): Observable<BaseResponse<boolean>> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.patch<BaseResponse<boolean>>(UPLOAD_PROFILE_PIC + id, formData);
    }

    uploadCoverPhoto(id: number, file: File): Observable<BaseResponse<boolean>> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.patch<BaseResponse<boolean>>(UPLOAD_COVER_PHOTO + id, formData);
    }

    savePost(post: SavePost): Observable<BaseResponse<number>> {
        return this.http.post<BaseResponse<number>>(POST, post);
    }

    sendFriendRequest(friendRequest: FriendRequest): Observable<BaseResponse<number>> {
        return this.http.post<BaseResponse<number>>(SEND_FRIEND_REQUEST, friendRequest);
    }

    confirmFriendRequest(requestId: number): Observable<BaseResponse<boolean>> {
        return this.http.get<BaseResponse<boolean>>(CONFIRM_FRIEND_REQUEST + requestId);
    }

    unFriend(friendRequest: FriendRequest): Observable<BaseResponse<number>> {
        return this.http.post<BaseResponse<number>>(UN_FRIEND, friendRequest);
    }

    searchUser(keyword: string, userId: number): Observable<BaseResponse<UserWrap[]>> {
        return this.http.get<BaseResponse<UserWrap[]>>(USER_SEARCH + userId + "/" + keyword);
    }

    searchFriends(keyword: string, userId: number): Observable<BaseResponse<UserWrap[]>> {
        return this.http.get<BaseResponse<UserWrap[]>>(FRIEND_SEARCH + userId + "/" + keyword);
    }

    likePost(request: LikeRequest): Observable<BaseResponse<boolean>> {
        return this.http.post<BaseResponse<boolean>>(POST_LIKE, request);
    }

    getUpcomingBirthdays(userId: number): Observable<BaseResponse<CompleteUser[]>> {
        return this.http.get<BaseResponse<CompleteUser[]>>(UPCOMING_BIRTHDAYS + userId);
    }

    getFriendSuggestions(userId: number): Observable<BaseResponse<UserWrap[]>> {
        return this.http.get<BaseResponse<UserWrap[]>>(FRIEND_SUGGESTIONS + userId);
    }

    addComment(request: AddComment): Observable<BaseResponse<number>> {
        return this.http.post<BaseResponse<number>>(COMMENT, request);
    }

    sendMessage(request: SendMessage): Observable<BaseResponse<number>> {
        return this.http.post<BaseResponse<number>>(CHAT, request);
    }

    getMessages(sentBy: number, sentTo: number): Observable<BaseResponse<ChatResponse[]>> {
        return this.http.get<BaseResponse<ChatResponse[]>>(CHAT + "?sentBy=" + sentBy + "&sentTo=" + sentTo);
    }

    clearAllNotification(userId: number): Observable<BaseResponse<boolean>> {
        return this.http.get<BaseResponse<boolean>>(NOTIFICATION_CLEAR_ALL + userId);
    }

    getAllNotifications(userId: number): Observable<BaseResponse<Notification[]>> {
        return this.http.get<BaseResponse<Notification[]>>(NOTIFICATION + "/" + userId);
    }

    getAllActiveNotifications(userId: number): Observable<BaseResponse<Notification[]>> {
        return this.http.get<BaseResponse<Notification[]>>(NOTIFICATION_ACTIVE + userId);
    }

    getAllNotificationByAdmin(token: string, offset: number, limit: number): Observable<PaginationResponse<Notification[]>> {
        return this.http.get<PaginationResponse<Notification[]>>(NOTIFICATION_BY_ADMIN + "?offset=" + offset + "&limit=" + limit, { headers: new HttpHeaders({ 'token': token }) });
    }

    sendNotification(request: NotificationRequest, token: string): Observable<BaseResponse<boolean>> {
        return this.http.post<BaseResponse<boolean>>(NOTIFICATION, request, { headers: new HttpHeaders({ 'token': token }) });
    }

    getCustomPost(userId: number): Observable<BaseResponse<Post[]>> {
        return this.http.get<BaseResponse<Post[]>>(POST_CUSTOM + userId);
    }

    recoverUser(user: string): Observable<BaseResponse<UserRecovery>> {
        return this.http.get<BaseResponse<UserRecovery>>(USER_RECOVERY + user);
    }

    answer(user: string, answers: Answer): Observable<BaseResponse<number>> {
        return this.http.post<BaseResponse<number>>(USER_ANSWER + user, answers);
    }

    resetPassword(userId: number, request: Password): Observable<BaseResponse<boolean>> {
        return this.http.patch<BaseResponse<boolean>>(USER_RESET_PASSWORD + userId, request);
    }

    changePassword(userId: number, request: Password): Observable<BaseResponse<boolean>> {
        return this.http.patch<BaseResponse<boolean>>(USER_CHANGE_PASSWORD + userId, request);
    }

    updateAbout(userId: number, request: About): Observable<BaseResponse<boolean>> {
        return this.http.patch<BaseResponse<boolean>>(USER_UPDATE_ABOUT + userId, request);
    }

    updateAddress(userId: number, request: Address): Observable<BaseResponse<boolean>> {
        return this.http.patch<BaseResponse<boolean>>(USER_UPDATE_ADDRESS + userId, request);
    }

    updateRecoveryOptions(userId: number, request: RecoveryOptions): Observable<BaseResponse<boolean>> {
        return this.http.patch<BaseResponse<boolean>>(USER_UPDATE_RECOVERY_OPTIONS + userId, request);
    }

    loginAdmin(data: LoginUser): Observable<BaseResponse<User>> {
        return this.http.post<BaseResponse<User>>(ADMIN_LOGIN, data);
    }

    getAllPost(token: string, offset: number, limit: number): Observable<PaginationResponse<Post[]>> {
        return this.http.get<PaginationResponse<Post[]>>(POST + "?offset=" + offset + "&limit=" + limit, { headers: new HttpHeaders({ 'token': token }) });
    }

    activateAndDeactivatePost(postId: number): Observable<BaseResponse<boolean>> {
        return this.http.patch<BaseResponse<boolean>>(ACTIVATE_DEACTIVATE_POST + postId, null);
    }

    saveTicket(request: TicketRequest): Observable<BaseResponse<number>> {
        return this.http.post<BaseResponse<number>>(TICKET, request);
    }

    updateStatus(request: UpdateStatus): Observable<BaseResponse<boolean>> {
        return this.http.patch<BaseResponse<boolean>>(TICKET_UPDATE_STATUS, request);
    }

    getAllTicketsByUser(userId: number): Observable<BaseResponse<TicketResponse[]>> {
        return this.http.get<BaseResponse<TicketResponse[]>>(TICKET_BY_USER + userId);
    }

    getTicketById(id: number): Observable<BaseResponse<TicketResponse>> {
        return this.http.get<BaseResponse<TicketResponse>>(TICKET + "/" + id);
    }

    getAllTickets(token: string, status: string, offset: number, limit: number): Observable<PaginationResponse<TicketResponse[]>> {
        return this.http.get<PaginationResponse<TicketResponse[]>>(TICKET + "?status=" + status + "&offset=" + offset + "&limit=" + limit, { headers: new HttpHeaders({ 'token': token }) });
    }

    saveAdmin(request: RegisterUser): Observable<BaseResponse<number>> {
        return this.http.post<BaseResponse<number>>(ADMIN, request);
    }

}