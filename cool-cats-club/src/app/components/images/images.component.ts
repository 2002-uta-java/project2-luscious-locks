import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images;

  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.apiService.postImage('https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg', '', '', '').subscribe(
      (data)=>{
      console.log(data);
    })

    this.apiService.getImage('XLfaJkK').subscribe(
      (data)=>{
      console.log(data);
    })

    this.apiService.getImages().subscribe(
      (data)=>{
      console.log(data);
      this.images = data;
      this.images = this.images.data;
      console.log(this.images);
    })
  }

}
