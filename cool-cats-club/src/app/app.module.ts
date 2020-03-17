import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UsersComponent } from './components/users/users.component';
import { ImagesComponent } from './components/images/images.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavigationComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: '',
      component: LoginFormComponent
    },{
      path: 'signin',
      component: LoginFormComponent
  },{
      path: 'signup',
      component: SignupFormComponent
  },{
      path: 'users',
      component: UsersComponent
  },{
      path: 'images',
      component: ImagesComponent
  }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
