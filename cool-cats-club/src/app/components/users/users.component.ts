import { ApiService } from '../../Services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;

  basicAuth: string = 'YnJpYW46d2hhdGV2';

  isAuth: string = 'aXNyYWVsOnBhc3N3b3Jk';

  constructor(private apiService: ApiService) { }

  ngOnInit(){
    // this.apiService.signUpUser('Michael', 'mtsang').subscribe(
    //   (data)=>{
    //     console.log(data);
    //   }
    // );
    this.apiService.getUsers(this.basicAuth).subscribe(
      (data)=>{
      console.log(data);
      this.users = data;
    });
    // this.apiService.loginUser('Michael','mtsang').subscribe(
    //   (data)=>{
    //     console.log(data);
    //   }
    // );
  }

}
