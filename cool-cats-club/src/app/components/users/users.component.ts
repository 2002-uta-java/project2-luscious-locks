import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;

  baseUrl: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.apiService.getUsers(this.baseUrl).subscribe((data)=>{
      console.log(data);
      this.users = data;
    })
  }

}
