import { ApiService } from '../../Services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images;
  index;
  rating: number[] = [1, 2, 3];
  comment: string = "";
  flagged: boolean = false;
  isMine: boolean = true;

  constructor(public router: Router, private apiService: ApiService) { }

  ngOnInit(){
    // this.apiService.postImage('https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg').subscribe(
    //   (data)=>{
    //   console.log(data);
    // })
    // this.apiService.getImage('XLfaJkK').subscribe(
    //   (data)=>{
    //   console.log(data);
    // })

    this.apiService.getImages().subscribe(
      (data)=>{
      console.log(data);
      this.images = data;
      this.images = this.images.data;
      console.log(this.images);
    });   

    if(this.router.url === '/home') {
      this.isMine = false;
    }

    // this.apiService.deleteImage('k65mhSB').subscribe(
    //   (data)=>{
    //   console.log(data);
    // })
  }

  public flag() {
    this.flagged = !this.flagged;
    console.log(this.flagged);
  }

}
