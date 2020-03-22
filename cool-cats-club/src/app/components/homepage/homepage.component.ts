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

  user;

  images:Image[];

  token:string;

  //Image fields to populate modal
  currentImages:Image[];
  currentImage:Image;
  imageRating;
  currentRating;
  imageComments;
  currentComment;

  ngOnInit(): void {
    if(this.userSession.getToken()){
      this.sharedService.isSignedInData.emit(true);
      this.sharedService.homeClassData.emit("nav-link active");
      this.sharedService.profileClassData.emit("nav-link");
      this.token = this.userSession.getToken();
      this.populateUser();
      this.populateImages();
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

  openModalById(content, id:number){
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

    //get ratings by image id and save them locally for modal

    //open template modal
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',
    backdropClass: 'light-grey-backdrop', scrollable: true});
  }

}
