import { Router } from '@angular/router';
import { UserSessionService } from './../../Services/user-session.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { ApiService } from 'src/app/Services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../profile-info/user';

@Component({
  selector: 'app-moderator-users',
  templateUrl: './moderator-users.component.html',
  styleUrls: ['./moderator-users.component.css']
})
export class ModeratorUsersComponent implements OnInit {

  users:User[];
  user:User;
  ban:boolean;
  mute:boolean;
  message:string;

  constructor(private sharedService: SharedService, private userSession: UserSessionService, private router: Router,
    private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.userSession.getToken()){
      this.sharedService.isSignedInData.emit(true);
      this.sharedService.homeClassData.emit("nav-link active");
      this.sharedService.profileClassData.emit("nav-link");
      this.getUsers();
    }
    else{
      this.router.navigate(['/signin']);
    }
  }

  getUsers(){
    this.apiService.getUsers(this.userSession.getToken()).subscribe(
      (data)=>{
        this.users = data as User[];
      },error=>{
        console.log("Couldn't load users");
      }
    )
  }

  editModal(content, id:number){
    console.log(id);
    this.users.forEach(u=>{
      if(u.id===id){
        this.user = u;
      }
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  warnModal(content, id:number){
    console.log(id);
    this.users.forEach(u=>{
      if(u.id===id){
        this.user = u;
      }
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  postInfo(){
    if(this.ban){
      console.log("changed on click to: " + this.ban);
      if(this.ban !== this.user.banned){
        //sent api request to update
      }
    }
    if(this.mute){
      if(this.mute !== this.user.muted){
        //sent api request to update
      }
      console.log("changed on click to: " + this.mute);
    }
    this.modalService.dismissAll();
  }

  postWarning(){
    if(this.message){
      //sent api request to update
    }
    this.modalService.dismissAll();
  }

  setToBan(ban:boolean){
    this.ban = ban;
  }

  setToMute(mute:boolean){
    this.mute = mute;
  }

}
