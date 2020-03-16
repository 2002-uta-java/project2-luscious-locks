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
    this.apiService.getUsers().subscribe((data)=>{
      console.log(data);
      this.images = data;
    })
  }

}
