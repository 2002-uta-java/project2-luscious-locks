import { ApiService } from '../../Services/api.service';
import { UserSessionService } from './../../Services/user-session.service';
import { Image } from '../homepage/image';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../Services/shared.service';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  user;
  token;
  images;
  dbImages;
  index;
  rating: number[] = [1, 2, 3];
  comment: string = "";
  flagged: boolean = false;
  isMine: boolean = true;

  currentImage: Image;
  imageRating;
  currentRating;
  imageComments;
  currentComment;

  constructor(public router: Router, private apiService: ApiService, 
    private userSession: UserSessionService, private modalService: NgbModal, private sharedService: SharedService) { }

  ngOnInit(){
    // this.apiService.getImages().subscribe(
    //   (data)=>{
    //   console.log(data);
    //   this.images = data;
    //   this.images = this.images.data;
    //   console.log(this.images);
    // });   

    this.token = this.userSession.getToken();
    this.populateUser();
    this.populateImages();

    if(this.router.url === '/home') {
      this.isMine = false;
    }

    // this.apiService.deleteImage('k65mhSB').subscribe(
    //   (data)=>{
    //   console.log(data);
    // })
  }

  populateUser(){
    console.log(this.token);
    console.log(atob(this.token).split(':')[0]);
    this.apiService.loginUser(atob(this.token).split(':')[0],atob(this.token).split(':')[1]).subscribe(
      (data)=>{
      console.log(data);
      this.user = data;
    })
  }

  populateImages(){
    this.apiService.getUserImages(this.token).subscribe(
      (data)=>{
        console.log(data);
        this.images = data as Image[];
      }
    )
  }

  public flag() {
    this.flagged = !this.flagged;
    console.log(this.flagged);
  }

  openModalById(content, id:number){
    //get image info and save it locally for modal
    this.images.forEach(image=>{
      if(image.id == id){
        this.currentImage = image;
      }
    });
    
    //get comments by image id and save them locally for modal

    //get ratings by image id and save them locally for modal

    //open template modal
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',
    backdropClass: 'light-grey-backdrop', scrollable: true});
  }
}
