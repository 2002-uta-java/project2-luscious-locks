import { Router } from '@angular/router';
import { UserSessionService } from './../../Services/user-session.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private sharedService: SharedService, private userSession: UserSessionService, private router: Router) { }

  ngOnInit(): void {
    if(this.userSession.getToken()){ 
      this.sharedService.isSignedInData.emit(true);
      if(this.userSession.getModerator()) {
        this.router.navigate(['/moderator-home']);
      } else {
        this.sharedService.homeClassData.emit("nav-link");
        this.sharedService.profileClassData.emit("nav-link active");
      }
    }
    else{
      this.router.navigate(['/signin']);
    }
  }

}
