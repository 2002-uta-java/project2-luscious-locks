import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavigationComponent,
    HomepageComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
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
      }]),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
