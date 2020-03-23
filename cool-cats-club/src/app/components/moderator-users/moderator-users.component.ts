import { Component, OnInit } from '@angular/core';
import { UserSessionService } from './../../Services/user-session.service';
import { SharedService } from '../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moderator-users',
  templateUrl: './moderator-users.component.html',
  styleUrls: ['./moderator-users.component.css']
})
export class ModeratorUsersComponent implements OnInit {

  constructor(private userSession: UserSessionService, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    if(this.userSession.getToken()){
      this.sharedService.isSignedInData.emit(true);
      if(this.userSession.getModerator) {
        this.sharedService.isModeratorData.emit(true);
        this.sharedService.moderatorHomeClassData.emit("nav-link");
        this.sharedService.moderatorUsersClassData.emit("nav-link active");
        this.sharedService.moderatorCommentsClassData.emit("nav-link");
      } else {
        this.router.navigate(['/home']);
      }
    }
    else{
      this.router.navigate(['/signin']);
    }
  }
}
