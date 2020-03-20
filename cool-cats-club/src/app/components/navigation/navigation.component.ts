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

  homeClass:string = "nav-link active";

  profileclass:string = "nav-link";

  constructor(public router: Router, private sharedService: SharedService) {
    this.sharedService.isSignedInData.subscribe(
      (data: boolean) => {
        this.isSignedIn = data;
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

  signOut(){
    this.homeClass = "nav-link active";
    this.profileclass = "nav-link";
    this.router.navigate(['/signin']);
    this.setSignIn(false);
  }

  setSignIn(isSignedIn: boolean){
      this.isSignedIn = isSignedIn;
  }

}
