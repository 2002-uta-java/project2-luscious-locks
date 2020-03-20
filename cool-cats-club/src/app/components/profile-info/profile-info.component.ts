import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  username: string = "Bret";

  password: string = "123";

  constructor() { }

  ngOnInit(): void {
  }

}
