import { ApiService } from '../../Services/api.service';
import { UserSessionService } from './../../Services/user-session.service';
import { Image } from '../homepage/image';
import { Rating } from '../homepage/rating';
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
  images: Image[] = [];
  dbImages;
  index;
  rating: number[] = [1, 2, 3];
  comment: string = "";
  isMuted: boolean = false;
  isModerator: boolean = false;

  currentImage:Image;
  imageRatings:Rating[];
  currentRating:Rating;
  imageComments:Comment[];
  currentComment:string = "";
  averageRating:number;
  myRating:number = 0;

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
    if(this.userSession.getModerator()) {
      this.isModerator = true;
    }

    this.populateUser();

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

        this.isMuted = this.user.muted;

        if(!this.isModerator) {
          this.apiService.getUserImagesByID(this.user.id, this.token).subscribe(
            (data: Image[])=>{
              this.images = data;
              console.log(this.images);
            }
          );
        } else {
          this.apiService.getUserImages(this.token).subscribe(
            (data: Image[])=>{
              for(let i = 0; i < data.length; i++) {
                if(data[i].flagged) {
                  this.images.push(data[i]);
                }
              } 
            }
          );
        }
      }
    );
  }
  
  openModalById(content, id:number) {
    //get image info and save it locally for modal
    this.images.forEach(image=>{
      if(image.id == id){
        this.currentImage = image;
      }
    });
    
    //get comments by image id and save them locally for modal
    this.apiService.getCommentsOfImage(this.currentImage.id, this.userSession.getToken()).subscribe(
      (data)=>{
        console.log(data);
        this.imageComments = data as Comment[];
        console.log(this.imageComments);
        this.imageComments.forEach(comment=>{
          console.log(comment);
        })
      }
    );

    //get ratings by image id and save them locally for modal
    this.apiService.getRatingOfImage(this.currentImage.id, this.userSession.getToken()).subscribe(
      (data)=>{
        console.log(data);
        this.imageRatings = data as Rating[];
        
        //if user has rated image then set current rating to the correct rating
        this.imageRatings.forEach(rating=>{
          if(rating.rater.id === this.user.id){
            this.currentRating = rating;
          }
        });

        this.averageRating = this.getAverageRatings();
        if(this.currentRating) {
          this.myRating = this.currentRating.rating;
        }
        console.log(this.averageRating);
      }
    );

    //open template modal
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true});  
  }
  
  postInfo(){
    let tempComment;
    console.log(this.currentComment);
    if(this.currentComment){
      tempComment = new Comment();
      tempComment['text'] = this.currentComment;
      tempComment['author'] = this.user;
      tempComment['image'] = this.currentImage;
      this.apiService.postCommentOnImage(this.currentImage.id, tempComment, this.userSession.getToken()).subscribe(
        (data)=>{
          console.log(data);
        }
      )
    }
    this.currentComment="";
    this.modalService.dismissAll();
    this.apiService.postRatingOnImage(this.currentImage.id, this.myRating, this.token).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

  getAverageRatings(){
    let avg:number = 0;
    this.imageRatings.forEach(rating=>{
      avg = avg + rating.rating;
    })
    console.log("sum: " + avg);
    return this.imageRatings.length ? (avg / this.imageRatings.length) : 0;
  }

  accept() {
    this.currentImage['accepted']=true;
    this.currentImage['flagged']=false;
    this.apiService.putFlagOnImage(this.currentImage.id, this.currentImage, this.token).subscribe();
    window.location.reload();
  }

  decline() {
    this.apiService.deleteImageDB(this.currentImage.id, this.token).subscribe(
      () => {
        window.location.reload();
      }
    );
  }
}
