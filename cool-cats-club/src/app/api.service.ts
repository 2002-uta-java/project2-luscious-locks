import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  usersUrl: string = 'https://jsonplaceholder.typicode.com/users';

  apiUrl: string = '';
  
  public getUsers(){
    return this.httpClient.get(this.usersUrl);
  }
}
