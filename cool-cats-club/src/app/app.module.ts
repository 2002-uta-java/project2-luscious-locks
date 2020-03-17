import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent
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
  }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
