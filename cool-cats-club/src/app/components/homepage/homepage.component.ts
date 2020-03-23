import { User } from './../profile-info/user';
import { Rating } from './rating';
import { Image } from './image';
import { ApiService } from './../../Services/api.service';
import { Router } from '@angular/router';
import { UserSessionService } from './../../Services/user-session.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private sharedService: SharedService, private userSession: UserSessionService, 
    private router: Router, private apiService: ApiService, private modalService: NgbModal) { }

  user:User;

  images:Image[];

  token:string;

  //Image fields to populate modal
  currentImages:Image[];
  currentImage:Image;
  imageRatings:Rating[];
  currentRating:Rating;
  imageComments:Comment[];
  currentComment:string = "";

  ngOnInit(): void {
    if(this.userSession.getToken()){
      if(this.userSession.getModerator()) {
        this.router.navigate(['/moderator-home']);
      } else {
        this.sharedService.isSignedInData.emit(true);
        this.sharedService.isModeratorData.emit(false);
        this.sharedService.homeClassData.emit("nav-link active");
        this.sharedService.profileClassData.emit("nav-link");
        this.token = this.userSession.getToken();
        this.populateUser();
        this.populateImages();
      }
    }
    else{
      this.router.navigate(['/signin']);
    }
  }

  populateUser(){
    console.log(this.token);
    console.log(atob(this.token).split(':')[0]);
    this.apiService.loginUser(atob(this.token).split(':')[0],atob(this.token).split(':')[1]).subscribe(
      (data)=>{
      console.log(data);
      this.user = data as User;
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

  openModalById(content, id:number){
    //open template modal
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',
    backdropClass: 'light-grey-backdrop', scrollable: true});
    //get image info and save it locally for modal
    this.apiService.getUserImages(this.userSession.getToken()).subscribe(
      (data)=>{
        console.log(data);
        this.currentImages = data as Image[];
        this.currentImages.forEach(image=>{
          if(image.id == id){
            this.currentImage = image;
          }
        })
      }
    )
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
    )
    //get ratings by image id and save them locally for modal
    this.apiService.getRatingOfImage(this.currentImage.id, this.userSession.getToken()).subscribe(
      (data)=>{
        console.log(data);
        this.imageRatings = data as Rating[];
        console.log(this.imageRatings);
        this.imageRatings.forEach(rating=>{
          console.log(rating);
        })
      }
    )
    //if user has rated image then set current rating to the correct rating
    this.imageRatings.forEach(rating=>{
      if(rating.rater.id === this.user.id){
        this.currentRating = rating;
      }
    })
  }

  postInfo(){
    this.modalService.dismissAll();
    console.log(this.currentComment);
  }

  getAverageRatings(){
    let avg:number = 0;
    this.imageRatings.forEach(rating=>{
      avg = avg + rating.rating;
    })
    console.log("sum: " + avg);
    return (avg / this.imageRatings.length);
  }

}
