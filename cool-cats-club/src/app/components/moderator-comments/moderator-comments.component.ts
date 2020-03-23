import { Image } from './../homepage/image';
import { User } from './../profile-info/user';
import { Comment } from './../homepage/comment';
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from './../../Services/user-session.service';
import { SharedService } from '../../Services/shared.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-moderator-comments',
  templateUrl: './moderator-comments.component.html',
  styleUrls: ['./moderator-comments.component.css']
})
export class ModeratorCommentsComponent implements OnInit {

  comments:Comment[] = new Comment()[0];

  constructor(private sharedService: SharedService, private userSession: UserSessionService, private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    if(this.userSession.getToken()){
      this.sharedService.isSignedInData.emit(true);
      if(this.userSession.getModerator) {
        this.sharedService.isModeratorData.emit(true);
        this.sharedService.moderatorHomeClassData.emit("nav-link");
        this.sharedService.moderatorUsersClassData.emit("nav-link");
        this.sharedService.moderatorCommentsClassData.emit("nav-link active");
        this.getComments();
      } else {
        this.router.navigate(['/home']);
      }
    }
    else{
      this.router.navigate(['/signin']);
    }
  }

  getComments(){
    this.apiService.getComments(this.userSession.getToken()).subscribe(
      (data)=>{
        this.comments = data as Comment[];
      }
    )
  }

  dismissComment(id:number){
    this.comments.forEach(c=>{
      if(c.id===id){
        c.flagged = false;
        this.apiService.putFlagOnComment(c.id, c, this.userSession.getToken()).subscribe(
          (data)=>{
            console.log(data);
          }
        )
      }
    })
    this.comments = [];
    this.getComments();
  }

  deleteComment(id:number){
    this.comments.forEach(c=>{
      if(c.id===id){
        this.apiService.deleteComment(c.id, this.userSession.getToken()).subscribe(
          (data)=>{
            console.log(data);
          }
        )
      }
    })
    this.comments = [];
    this.getComments();
  }
}
