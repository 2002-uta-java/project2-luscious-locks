import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';

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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onRadioChange(event) {
    this.type = event.target.value;
  }

  onFileChange(event) {
    this.images = event.target.files;
  }

  public processForm() : void {
    if(this.type === 'file') {
      this.apiService.postImage(this.images[0], this.type).subscribe(
        (data)=>{
        console.log(data);
      })
    } else if(this.type === 'url') {
      this.apiService.postImage(this.url, this.type).subscribe(
        (data)=>{
        console.log(data);
      })
    }
	}
}
