import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';

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

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onRadioChange(event) {
    this.type = event.target.value;
  }

  onFileChange(event) {
    this.images = event.target.files;
  }

  public processForm() : void {
    if(!this.images && !this.url) {
      this.isInvalid = true;
    } else {
      if(this.type === 'file') {
        this.apiService.postImage(this.images[0], this.type).subscribe(
          (data)=>{
            this.isInvalid = false;
            console.log(data);
            this.router.navigateByUrl('/images', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/profile']);
            }); 
        });
      } else if(this.type === 'url') {
        this.apiService.postImage(this.url, this.type).subscribe(
          (data)=>{
            this.isInvalid = false;
            console.log(data);
            this.router.navigateByUrl('/images', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/profile']);
            }); 
        });
      }
    }
	}
}
