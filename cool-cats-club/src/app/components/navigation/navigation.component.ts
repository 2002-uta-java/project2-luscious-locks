import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isSignedIn:boolean = false;

  homeClass:string = "nav-link";

  profileclass:string = "nav-link";

  constructor(public router: Router) { }

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
    this.router.navigate(['/signin']);
    this.setSignIn(false);
  }

  setSignIn(isSignedIn: boolean){
      this.isSignedIn = isSignedIn;
  }

}
