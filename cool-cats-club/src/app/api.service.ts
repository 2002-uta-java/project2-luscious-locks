import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = 'https://jsonplaceholder.typicode.com/users';
  public getUsers(){
    return this.httpClient.get(this.baseUrl);

  }
}
