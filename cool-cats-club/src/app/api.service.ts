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

  accessToken1: string = '17f9f5c7c047c939dfefaed4d541bf2c1a23fde4';
  accessToken2: string = 'd521b80cf990c5833cccf6fa19d7207e109544a9';
  accessToken3: string = '13380cf881fd6a203c6e31945e53dba5a6b8de82';
  
  public getUsers(){
    return this.httpClient.get(this.usersUrl);
  }

  public getImages(){
    return this.httpClient.get(this.apiGetUrl,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken1}`)});
  }
}
