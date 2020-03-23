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

  user: User;

  isInvalid: boolean = false;

  isEmpty: boolean = false;

  isInvalidChars: boolean = false;
  
  constructor(private apiService: ApiService, private userSession: UserSessionService ){ }
  
  ngOnInit(): void {
    let login = atob(this.userSession.getToken()).split(':');
    this.username = login[0];
    this.password = login[1];
    this.apiService.loginUser(this.username, this.password).subscribe(
      (data: User) => {
        console.log(data);
        this.user = data;
        this.status = this.user.muted ? 'Muted' : 'Good';
      }
    );
  }
  
  public saveChanges() {
    if(this.newUsername || this.newPassword) {
      this.isEmpty = false;
      if(this.newUsername.match('\\s') || this.newPassword.match('\\s')) {
        this.isInvalidChars = true;
      } else {
        this.isInvalidChars = false;
        this.apiService.getUsers(this.userSession.getToken()).subscribe(
          (data: User[]) => {
            console.log(data);
            for(let u of data) {
              if(u.username == this.newUsername) {
                this.isInvalid = true;
                break;
              }
            }
            this.apiService.loginUser(this.username, this.password).subscribe(
              (data) => {
                let user = data as User;
                this.apiService.putLoginOnUser(user.id, this.newUsername, this.newPassword, this.userSession.getToken()).subscribe(
                  (data) => {
                      console.log(data);
                      this.username = this.newUsername ? this.newUsername : this.username;
                      this.password = this.newPassword ? this.newPassword : this.password;
                      console.log(this.username);
                      console.log(this.password);
                      this.userSession.setToken(`${this.username}:${this.password}`);
                      console.log(atob(this.userSession.getToken()));
                      this.newUsername = '';
                      this.newPassword = '';
                  }
                );
              }
            );
          }
        )
      }
    } else {
      this.isEmpty = true;
    }
  }

  public close() {
    this.newUsername = '';
    this.newPassword = '';
    this.isInvalid = false;
    this.isEmpty = false;
    this.isInvalidChars = false;
  }
}
