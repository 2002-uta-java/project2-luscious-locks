import { UserSessionService } from './../../Services/user-session.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isSignedIn:boolean = false;

  isModerator: boolean = false;

  homeClass:string = "nav-link active";
  profileclass:string = "nav-link";

  moderatorHomeClass: string = "nav-link active";
  moderatorUsersClass: string = "nav-link";
  moderatorCommentsClass: string = "nav-link";

  constructor(public router: Router, private sharedService: SharedService, private userSession :UserSessionService) {
    this.sharedService.isSignedInData.subscribe(
      (data: boolean) => {
        this.isSignedIn = data;
      }
    );
    this.sharedService.isModeratorData.subscribe(
      (data: boolean) => {
        if(this.userSession.getModerator)
        this.isModerator = data;
      }
    );
    this.sharedService.moderatorHomeClassData.subscribe(
      (data: string) => {
        this.moderatorHomeClass = data;
      }
    );
    this.sharedService.moderatorUsersClassData.subscribe(
      (data: string) => {
        this.moderatorUsersClass = data;
      }
    );
    this.sharedService.moderatorCommentsClassData.subscribe(
      (data: string) => {
        this.moderatorCommentsClass = data;
      }
    );
    this.sharedService.homeClassData.subscribe(
      (data: string) => {
        this.homeClass = data;
      }
    );
    this.sharedService.profileClassData.subscribe(
      (data: string) => {
        this.profileclass = data;
      }
    );
  }

  ngOnInit(): void {
  }

  goHome(){
    this.homeClass = "nav-link active";
    this.profileclass = "nav-link";
    this.router.navigate(['/home']);
  }
  
  showProfile(){
    this.homeClass = "nav-link";
    this.profileclass = "nav-link active";
    this.router.navigate(['/profile']);
  }

  goModeratorHome() {
    this.moderatorHomeClass = "nav-link active";
    this.moderatorUsersClass = "nav-link";
    this.moderatorCommentsClass = "nav-link";
    this.router.navigate(['/moderator-home']);
  }
  
  showUsers() {
    this.moderatorHomeClass = "nav-link";
    this.moderatorUsersClass = "nav-link active";
    this.moderatorCommentsClass = "nav-link";
    this.router.navigate(['/moderator-users']);
   }

  showComments() {
    this.moderatorHomeClass = "nav-link";
    this.moderatorUsersClass = "nav-link";
    this.moderatorCommentsClass = "nav-link active";
    this.router.navigate(['/moderator-comments']);
  }

  signOut(){
    this.homeClass = "nav-link active";
    this.profileclass = "nav-link";

    this.moderatorHomeClass = "nav-link active";
    this.moderatorUsersClass = "nav-link";
    this.moderatorCommentsClass = "nav-link";

    this.router.navigate(['/signin']);
    this.userSession.clearToken();
    this.setSignIn(false);
  }

  setSignIn(isSignedIn: boolean){
    this.isSignedIn = isSignedIn;
  }

}
