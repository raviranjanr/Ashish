import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import {EVENT_MANAGER_PLUGINS} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoggingService } from './logging.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NotificationComponent } from './notification/notification.component';
import { UserblogsComponent } from './userblogs/userblogs.component';
// import { SimpleComponent } from './others/simple.component';
// import { HistoryComponent } from './history/history.component';

const appRoutes: Routes = [
{path: 'home', component: HomeComponent},
{path: 'list', component: ListComponent},
{path: 'create', component: CreateUserComponent},
{path: 'login', component: LoginComponent},
{path: 'signup', component: SignupComponent},
{path: 'profile', component: ProfileComponent},
{path: 'forgot', component: ForgotpasswordComponent},
{path: 'blog', component: UserblogsComponent},
// {path: 'sim', component: SimpleComponent},
// {path: 'history', component: ForgotpasswordComponent},
{path : '', redirectTo : '/login', 'pathMatch' : 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    HomeComponent,
    CreateUserComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    DropdownDirective,
    ForgotpasswordComponent,
    NotificationComponent,
    UserblogsComponent/*,
    SimpleComponent*/
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }