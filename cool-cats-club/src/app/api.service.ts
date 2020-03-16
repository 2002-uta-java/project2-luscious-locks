import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  usersUrl: string = 'https://jsonplaceholder.typicode.com/users';

  apiPostUrl: string = 'https://api.imgur.com/3/upload';

  apiGetUrl: string = 'https://api.imgur.com/3/account/me/images';
  
  public getUsers(){
    return this.httpClient.get(this.usersUrl);
  }

  public getImages(){
    const params:HttpParams = new HttpParams()
    .set("" , "");
    return this.httpClient.get(this.apiGetUrl,{params});
  }
}
