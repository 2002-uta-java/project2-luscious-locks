import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.isSignedInData.emit(true);
    this.sharedService.homeClassData.emit("nav-link active");
    this.sharedService.profileClassData.emit("nav-link");
  }

}
