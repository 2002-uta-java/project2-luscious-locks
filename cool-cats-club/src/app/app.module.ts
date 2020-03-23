import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UsersComponent } from './components/users/users.component';
import { ImagesComponent } from './components/images/images.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfilePicturesComponent } from './components/profile-pictures/profile-pictures.component';

import { SharedService } from './Services/shared.service';
import { ModeratorHomeComponent } from './components/moderator-home/moderator-home.component';
import { ModeratorUsersComponent } from './components/moderator-users/moderator-users.component';
import { ModeratorCommentsComponent } from './components/moderator-comments/moderator-comments.component';
import { ModeratorImagesComponent } from './components/moderator-images/moderator-images.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavigationComponent,
    HomepageComponent,
    UsersComponent,
    ImagesComponent,
    DashboardComponent,
    ProfileComponent,
    ProfileInfoComponent,
    ProfilePicturesComponent,
    ModeratorHomeComponent,
    ModeratorUsersComponent,
    ModeratorCommentsComponent,
    ModeratorImagesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbAlertModule,
    RouterModule.forRoot([{
      path: 'home',
      component: HomepageComponent
    },{
      path: 'signin',
      component: LoginFormComponent
    },{
      path: 'signup',
      component: SignupFormComponent
    },{
      path: '',
      component: LoginFormComponent
    },{
      path: 'users',
      component: UsersComponent
    },{
      path: 'images',
      component: ImagesComponent
    },{
      path: 'profile',
      component: ProfileComponent
    }, {
      path: 'moderator-home',
      component: ModeratorHomeComponent
    }, {
      path: 'moderator-users',
      component: ModeratorUsersComponent
    }, {
      path: 'moderator-comments',
      component: ModeratorCommentsComponent
    }]),
    HttpClientModule,
    FormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
