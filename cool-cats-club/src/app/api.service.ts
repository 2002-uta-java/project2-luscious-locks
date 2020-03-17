import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  usersUrl: string = 'https://jsonplaceholder.typicode.com/users';

  apiPostUrl: string = 'https://api.imgur.com/3/upload';

  apiGetUrl: string = 'https://api.imgur.com/3/account/me/images';

  // Bearer token when authorizing getAll
  accessToken: string = '17f9f5c7c047c939dfefaed4d541bf2c1a23fde4';

  // Client-ID token when authorizing getting or posting an image
  clientId: string = '546c25a59c58ad7';

  catImg: string = 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg';
  imgName: string = 'kitty';
  
  public getUsers(){
    return this.httpClient.get(this.usersUrl);
  }

  public getImages(){
    return this.httpClient.get(this.apiGetUrl,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)});
  }

  public getImage(imageHash){
    return this.httpClient.get(`${this.apiGetUrl}/${imageHash}`,{ headers: new HttpHeaders().set('Authorization', `Client-ID ${this.clientId}`)});
  }

  public postImage(image, title){
    const formData = new FormData();
    formData.append('image', this.catImg);
    formData.append('name', this.imgName);
    return this.httpClient.post(this.apiPostUrl, formData, { headers: new HttpHeaders().set('Authorization', `Client-ID ${this.clientId}`)});
  }
}
