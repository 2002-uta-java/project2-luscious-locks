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
      if(this.userSession.getModerator) {
        console.log('im in users');
        this.sharedService.isModeratorData.emit(true);
        this.sharedService.moderatorHomeClassData.emit("nav-link");
        this.sharedService.moderatorUsersClassData.emit("nav-link active");
        this.sharedService.moderatorCommentsClassData.emit("nav-link");
         this.getUsers();
      } else {
        this.router.navigate(['/home']);
      }
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
    if(this.ban || this.ban === false){
      console.log("clicked on ban: " + this.ban);
      if(this.ban !== this.user.banned){
        this.user.banned = this.ban;
        this.apiService.putUpdateUser(this.user.id,this.user, this.userSession.getToken()).subscribe(
          (data)=>{
            console.log(data);
          }
        );
      }
    }
    if(this.mute || this.mute === false){
      if(this.mute !== this.user.muted){
        this.user.muted = this.mute;
        this.apiService.putUpdateUser(this.user.id,this.user, this.userSession.getToken()).subscribe(
          (data)=>{
            console.log(data);
          }
        );
      }
      console.log("clicked on mute: " + this.mute);
    }
    this.modalService.dismissAll();
  }

  postWarning(){
    if(this.message){
        this.user.warning = this.message;
        this.apiService.putUpdateUser(this.user.id,this.user, this.userSession.getToken()).subscribe(
          (data)=>{
            console.log(data);
          }
        );
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
