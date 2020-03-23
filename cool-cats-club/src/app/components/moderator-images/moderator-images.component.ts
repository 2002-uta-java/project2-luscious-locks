import { Component, OnInit } from '@angular/core';
import { UserSessionService } from './../../Services/user-session.service';
import { SharedService } from '../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moderator-images',
  templateUrl: './moderator-images.component.html',
  styleUrls: ['./moderator-images.component.css']
})
export class ModeratorImagesComponent implements OnInit {

  constructor(private userSession: UserSessionService, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    if(this.userSession.getToken()){
    }
    else{
      this.router.navigate(['/signin']);
    }
  }

}
