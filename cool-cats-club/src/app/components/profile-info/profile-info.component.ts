import { UserSessionService } from './../../Services/user-session.service';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { User } from './user';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  username: string = "israel";

  password: string = "";

  @Input() newUsername: string = "";

  @Input() newPassword: string = "";

  status: string = "Good";

  users: User[] = [];

  isInvalid: boolean = false;

  constructor(private apiService: ApiService, private userSession: UserSessionService) { }

  ngOnInit(): void {
  }

  public saveChanges() {
    if(this.newUsername || this.newPassword) {
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
            this.username = this.newUsername;
            this.password = this.newPassword;
            this.newUsername = '';
            this.newPassword = '';
          }
        }
      );
    }
  }
}
