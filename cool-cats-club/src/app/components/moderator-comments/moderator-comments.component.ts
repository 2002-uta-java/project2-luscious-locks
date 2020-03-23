import { Component, OnInit } from '@angular/core';
import { UserSessionService } from './../../Services/user-session.service';
import { SharedService } from '../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moderator-comments',
  templateUrl: './moderator-comments.component.html',
  styleUrls: ['./moderator-comments.component.css']
})
export class ModeratorCommentsComponent implements OnInit {

  constructor(private userSession: UserSessionService, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    if(this.userSession.getToken()){
      this.sharedService.isModeratorData.subscribe(
        (data) => {
          if(data) {
            this.sharedService.isSignedInData.emit(true);
            this.sharedService.moderatorHomeClassData.emit("nav-link");
            this.sharedService.moderatorUsersClassData.emit("nav-link");
            this.sharedService.moderatorCommentsClassData.emit("nav-link active");
          } else {
            this.router.navigate(['/home']);
          }
        }
      );
    }
    else{
      this.router.navigate(['/signin']);
    }
  }
}
