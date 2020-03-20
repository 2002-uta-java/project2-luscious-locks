import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.isSignedInData.emit(true);
    this.sharedService.homeClassData.emit("nav-link");
    this.sharedService.profileClassData.emit("nav-link active");
  }

}
