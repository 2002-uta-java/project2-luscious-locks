import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  usersUrl: string = 'http://ec2-18-224-6-156.us-east-2.compute.amazonaws.com:8090/Proj2-0.0.1-SNAPSHOT/users';

  apiPostUrl: string = 'https://api.imgur.com/3/upload';

  apiGetUrl: string = 'https://api.imgur.com/3/account/me/images';

  apiImageUrl: string = 'https://api.imgur.com/3/image';

  // Bearer token used when authorizing access to an imgur account (ie. getImages(), postImages(), deleteImage())
  accessToken: string = '17f9f5c7c047c939dfefaed4d541bf2c1a23fde4';

  // Client-ID token used for anonymous access (ie. getImage())
  clientId: string = '546c25a59c58ad7';
  
  basicAuth: string = 'YnJpYW46d2hhdGV2';

  public getUsers(){
    return this.httpClient.get(this.usersUrl,{ headers: new HttpHeaders().set('Authorization', `Basic ${this.basicAuth}`)});
  }

  public getImages(){
    return this.httpClient.get(this.apiGetUrl,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)});
  }

  public getImage(imageId){
    return this.httpClient.get(`${this.apiImageUrl}/${imageId}`,{ headers: new HttpHeaders().set('Authorization', `Client-ID ${this.clientId}`)});
  }
  
  // need image parameter, others are optional; returns 200 on success :)
  public postImage(image, name, title, description){
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);
    return this.httpClient.post(this.apiImageUrl, formData, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)});
  }

  public deleteImage(imageId){
    return this.httpClient.delete(`${this.apiImageUrl}/${imageId}`,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)});
  }
}
