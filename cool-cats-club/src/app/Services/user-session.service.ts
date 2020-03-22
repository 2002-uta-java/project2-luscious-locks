import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor() {}

  setToken(token:string){
    window.localStorage.setItem('token', `${btoa(token)}`);
  }

  getToken():string{
    return window.localStorage.getItem('token');
  }

  clearToken(){
    window.localStorage.clear();
  }
}
