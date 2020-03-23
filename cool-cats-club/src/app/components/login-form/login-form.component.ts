import { UserSessionService } from './../../Services/user-session.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { SharedService } from '../../Services/shared.service';
import { User } from '../profile-info/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user: User;

  username:string = "";

  password:string = "";

  found: boolean = false;

  isModerator: boolean = false;

  constructor(private apiService: ApiService,  private sharedService: SharedService, public router: Router, private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.sharedService.isSignedInData.emit(false);
    if(this.userSession.getToken()){
      this.sharedService.isSignedInData.emit(true);
      if(this.userSession.getModerator()) {
        this.router.navigate(['/moderator-home']);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  authenticate(){
    this.apiService.loginUser(this.username, this.password).subscribe(
      (data)=>{
        this.user = data as User;
        console.log(this.user);
        console.log(this.username + ", " + this.password);
        this.found = true;
        this.isModerator = this.user.moderator;
        this.sharedService.isSignedInData.emit(this.found);
        this.sharedService.isModeratorData.emit(this.isModerator);
        this.userSession.setToken(`${this.username}:${this.password}`);
        console.log("token: " + this.userSession.getToken());
        if(this.isModerator) {
          this.userSession.setModerator(this.isModerator);
          this.router.navigate(['/moderator-home'])
        } else {
          this.router.navigate(['/home']);
        }
      },
      error=>{
        console.log(error.status);
        console.log("Invalid username or password");
      }
    )
  }

}
