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

  users:any;

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
    this.apiService.getUsers().subscribe((data)=>{
      this.users = data;
      console.log(this.users);
      console.log(this.username + ", " + this.password);
      for(let user of this.users){
        console.log(user);
        if(user.username === this.username /*&& user.password === this.password*/){
          this.router.navigate(['/home']);
          this.found = true;
          this.sharedService.isSignedInData.emit(this.found);
          this.userSession.setToken(`${this.username}:${this.password}`);
          console.log("token: " + this.userSession.getToken());
        }
      }
      if(!this.found)
        console.log("Invalid username or password!");
    })
  }

}
