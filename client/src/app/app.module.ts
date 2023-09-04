import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from './material.module';
import { NonAdminDashboardComponent } from './components/non-admin-dashboard/non-admin-dashboard.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleDeleteComponent } from './components/article-delete/article-delete.component';
import { LoginComponent } from './components/login/login.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { UsersComponent } from './components/users/users.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { SideBarUserComponent } from './components/side-bar-user/side-bar-user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ResponseInterceptorService } from './services/response-interceptor.service';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { TransactionDeleteComponent } from './components/transaction-delete/transaction-delete.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { AuthorizePasswordComponent } from './components/authorize-password/authorize-password.component';
import { AuthorizePasswordResetComponent } from './components/authorize-password-reset/authorize-password-reset.componenet';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { ArticleImportComponent } from './components/article-import/article-import.component';
import { CreateAdminCommandComponent } from './components/create-admincommand/create-admincommand.component';
import { ArticleCloseComponent } from './components/article-close/article-close.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { CreateAnnouncementComponent } from './components/announcement-create/announcement-create.component';
import { AnnouncementDeleteComponent } from './components/announcement-delete/announcement-delete.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { LeaveDeleteComponent } from './components/leave-delete/leave-delete.component';
import { CreateLeaveComponent } from './components/leave-create/leave-create.component';
import { LeaveRejectComponent } from './components/leave-reject/leave-reject.component';
import { LeaveApproveComponent } from './components/leave-approve/leave-approve.component';
import { LeavesUserComponent } from './components/leaves-user/leaves-user.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    DashboardComponent,
    NonAdminDashboardComponent,
    ArticleFormComponent,
    ArticleDeleteComponent,
    LoginComponent,
    TransactionsComponent,
    UsersComponent,
    UserDeleteComponent,
    ResetpasswordComponent,
    SideBarUserComponent,
    LogoutComponent,
    CreateUserComponent,
    TransactionDeleteComponent,
    TransactionFormComponent,
    AuthorizePasswordComponent,
    AuthorizePasswordResetComponent,
    ArticleImportComponent,
    CreateAdminCommandComponent,
    ArticleCloseComponent,
    AnnouncementsComponent,
    CreateAnnouncementComponent,
    AnnouncementDeleteComponent,
    LandingpageComponent,
    LeavesComponent,
    LeaveDeleteComponent,
    CreateLeaveComponent,
    LeaveRejectComponent,
    LeaveApproveComponent,
    LeavesUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
