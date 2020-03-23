import { UserSessionService } from './../../Services/user-session.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  users:any;

  username:string = "";

  password:string = "";

  taken: boolean = false;

  constructor(private apiService: ApiService, private sharedService: SharedService, public router: Router, private userSession: UserSessionService) { }

  ngOnInit(): void {
    if(this.userSession.getToken()){
      this.sharedService.isSignedInData.emit(true);
      this.sharedService.isModeratorData.subscribe(
        (data) => {
          if(data) {
            this.router.navigate(['/moderator-home']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      );
    }
  }

  authenticate(){
    this.apiService.getUsers('YnJpYW46d2hhdGV2').subscribe((data)=>{
      this.users = data;
      for(let user of this.users){
        if(user.username === this.username){
          this.taken = true;
          console.log("Username is taken");
        }
        if(!this.taken){
          this.signup();
        }
      }
    })
  }

  signup(){
    //post request to persist user
    this.apiService.signUpUser(this.username, this.password).subscribe(
      (data)=>{
        console.log(data);
      },
      error=>{
        console.log("Couldn't create user");
      }
    );
    //Store user token to maintain session
    this.userSession.setToken(`${this.username}:${this.password}`);
    this.sharedService.isSignedInData.emit(true);
    this.router.navigate(['/home']);
  }

  closeAlert(){
    window.location.reload();
  }

}
