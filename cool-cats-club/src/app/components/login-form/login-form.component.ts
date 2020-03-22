import { UserSessionService } from './../../Services/user-session.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user:any;

  username:string = "";

  password:string = "";

  found: boolean = false;

  constructor(private apiService: ApiService,  private sharedService: SharedService, public router: Router, private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.sharedService.isSignedInData.emit(false);
    if(this.userSession.getToken()){
      this.router.navigate(['/home']);
      this.sharedService.isSignedInData.emit(true);
    }
  }

  authenticate(){
    this.apiService.loginUser(this.username, this.password).subscribe(
      (data)=>{
        this.user = data;
        console.log(this.user);
        console.log(this.username + ", " + this.password);
        this.router.navigate(['/home']);
        this.found = true;
        this.sharedService.isSignedInData.emit(this.found);
        this.userSession.setToken(`${this.username}:${this.password}`);
        console.log("token: " + this.userSession.getToken());
      },
      error=>{
        console.log(error.status);
        console.log("Invalid username or password");
      }
    )
  }

}
