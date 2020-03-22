import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { UserSessionService } from './../../Services/user-session.service';
import { User } from './user';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  username: string;

  password: string;

  @Input() newUsername: string = "";

  @Input() newPassword: string = "";

  status: string = "Good";

  users: User[] = [];

  isInvalid: boolean = false;

  isEmpty: boolean = false;

  constructor(private apiService: ApiService, private userSession: UserSessionService ){ }

  ngOnInit(): void {
    let login = atob(this.userSession.getToken()).split(':');
    this.username = login[0];
    this.password = login[1];
  }

  public saveChanges() {
    if(this.newUsername || this.newPassword) {
      this.isEmpty = false;
      this.apiService.getUsers(this.userSession.getToken()).subscribe(
        (data) => {
          this.users = data as User[];
          for(let user of this.users) {
            this.isInvalid = this.newUsername === user.username;
            if(this.isInvalid) {
              break;
            }
          }
          if(!this.isInvalid) {
            this.username = this.newUsername ? this.newUsername : this.username;
            this.password = this.newPassword ? this.newPassword : this.password;
            this.newUsername = '';
            this.newPassword = '';
          }
        }
      );
    } else {
      this.isEmpty = true;
    }
  }
}
