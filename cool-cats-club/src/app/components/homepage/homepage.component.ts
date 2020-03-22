import { Router } from '@angular/router';
import { UserSessionService } from './../../Services/user-session.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private sharedService: SharedService, private userSession: UserSessionService, private router: Router) { }

  ngOnInit(): void {
    if(this.userSession.getToken()){
      this.sharedService.isSignedInData.emit(true);
      this.sharedService.homeClassData.emit("nav-link active");
      this.sharedService.profileClassData.emit("nav-link");
    }
    else{
      this.router.navigate(['/signin']);
    }
  }

}
