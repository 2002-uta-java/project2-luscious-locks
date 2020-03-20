import { ApiService } from '../../Services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;

  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.apiService.getUsers().subscribe(
      (data)=>{
      console.log(data);
      this.users = data;
    })
  }

}
