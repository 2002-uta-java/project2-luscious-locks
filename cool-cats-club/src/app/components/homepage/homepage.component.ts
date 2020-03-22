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

  images;

  token:string;

  template;

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
        this.images = data;
      }
    )
  }

  openModalById(id:number){
    this.template = `
      <ng-template #content let-modal>
        <div class="modal-header">
          <h4 class="modal-title" id="modal-basic-title">Profile update</h4>
          <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="dateOfBirth">Date of birth</label>
              <div class="input-group">
                <input id="dateOfBirth" class="form-control" placeholder="yyyy-mm-dd" name="dp" ngbDatepicker #dp="ngbDatepicker">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary calendar" (click)="dp.toggle()" type="button"></button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" (click)="modal.close('Save click')">Save</button>
        </div>
      </ng-template>
    `;
    this.modalService.open(this.template, {ariaLabelledBy: 'modal-basic-title'});
  }

}
