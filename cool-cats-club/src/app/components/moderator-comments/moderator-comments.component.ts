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

  comments:Comment[];

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
        let temp:Comment[];
        temp = data as Comment[];
        temp.forEach(c=>{
          if(c.flagged){
            this.comments.push(c);
          }
        })
      }
    )
  }

  dismissComment(id:number){
    this.comments.forEach(c=>{
      if(c.id===id){
        c.flagged = false;
      }
    })
    this.comments = [];
    this.getComments();
  }

  deleteComment(id:number){
    this.comments.forEach(c=>{
      if(c.id===id){
        //api request to delete comment
      }
    })
    this.comments = [];
    this.getComments();
  }
}
