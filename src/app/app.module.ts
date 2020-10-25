import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BaseComponent } from './base/base.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeadComponent } from './head/head.component';
import { FootComponent } from './foot/foot.component';
import { TestingComponent } from './testing/testing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { NotificationComponent } from './notification/notification.component';
import { FriendsComponent } from './friends/friends.component';
import { SettingsComponent } from './settings/settings.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PostViewComponent } from './post-view/post-view.component';
import { SearchComponent } from './search/search.component';
import { PhotosComponent } from './photos/photos.component';
import { VideosComponent } from './videos/videos.component';
import { ApiService } from './api/api.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManagePostsComponent } from './admin/manage-posts/manage-posts.component';
import { ManageLogsComponent } from './admin/manage-logs/manage-logs.component';
import { ManageEmailsComponent } from './admin/manage-emails/manage-emails.component';
import { ManageNotificationsComponent } from './admin/manage-notifications/manage-notifications.component';
import { ManageTicketsComponent } from './admin/manage-tickets/manage-tickets.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { TicketComponent } from './ticket/ticket.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'index', component: IndexComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'friendRequest', component: FriendRequestComponent },
  { path: 'notifications', component: NotificationComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'postView', component: PostViewComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'testing', component: TestingComponent },
  { path: 'search', component: SearchComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'tickets', component: TicketComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'admin', component: DashboardComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/manageUsers', component: ManageUsersComponent },
  { path: 'admin/managePosts', component: ManagePostsComponent },
  { path: 'admin/manageNotifications', component: ManageNotificationsComponent },
  { path: 'admin/manageLogs', component: ManageLogsComponent },
  { path: 'admin/manageTickets', component: ManageTicketsComponent },
  { path: 'admin/manageEmails', component: ManageEmailsComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'viewProfile', component: ViewProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    HeadComponent,
    FootComponent,
    IndexComponent,
    TestingComponent,
    ProfileComponent,
    ChatComponent,
    NotificationComponent,
    FriendsComponent,
    SettingsComponent,
    FriendRequestComponent,
    EditProfileComponent,
    PostViewComponent,
    SearchComponent,
    PhotosComponent,
    VideosComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ManageUsersComponent,
    ManagePostsComponent,
    ManageLogsComponent,
    ManageEmailsComponent,
    ManageNotificationsComponent,
    ManageTicketsComponent,
    AdminHeaderComponent,
    AdminLoginComponent,
    TicketComponent,
    ViewProfileComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
