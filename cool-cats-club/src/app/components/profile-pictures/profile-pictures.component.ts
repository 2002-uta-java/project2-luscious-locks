import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { UserSessionService } from './../../Services/user-session.service';
import { Router } from '@angular/router';
import { Data } from './data';

@Component({
  selector: 'app-profile-pictures',
  templateUrl: './profile-pictures.component.html',
  styleUrls: ['./profile-pictures.component.css']
})
export class ProfilePicturesComponent implements OnInit {

  images: any[];
  url: string = '';
  type: string = 'file';
  name: string = '';
  title: string = '';
  description: string = '';
  isInvalid: boolean = false;

  constructor(private apiService: ApiService, private userSession: UserSessionService, private router: Router) { }

  ngOnInit(): void {
  }

  onRadioChange(event) {
    this.type = event.target.value;
  }

  onFileChange(event) {
    this.images = event.target.files;
  }
  
  public selected(event){
    this.type = event.target.value;
  }

  public processForm() : void {
    if(!this.images && !this.url) {
      this.isInvalid = true;
    } else {
      if(this.type === 'file') {
        this.apiService.postImage(this.images[0], this.type, this.description).subscribe(
          (data)=>{
            this.isInvalid = false;
            console.log(data);
            let d  = data as Data;
            let img = d.data;
            this.apiService.postImageDB(img.link, img.description, this.userSession.getToken()).subscribe(
              (data) => {
                console.log(data);
              }
            );
            window.location.reload();
        });
      } else if(this.type === 'url') {
        this.apiService.postImage(this.url, this.type, this.description).subscribe(
          (data)=>{
            this.isInvalid = false;
            console.log(data);
            let d  = data as Data;
            let img = d.data;
            this.apiService.postImageDB(img.link, img.description, this.userSession.getToken()).subscribe(
              (data) => {
                console.log(data);
              }
            );
            window.location.reload();
        });
      }
    }
  }
}
