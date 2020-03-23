import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor() {}

  setToken(token:string){
    window.localStorage.setItem('token', `${btoa(token)}`);
  }

  setModerator(isModerator:boolean) {
    window.localStorage.setItem('isModerator', `${isModerator}`);
  }

  getToken():string{
    return window.localStorage.getItem('token');
  }

  getModerator():string{
    return window.localStorage.getItem('isModerator');
  }

  clearToken(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('isModerator');
    window.localStorage.clear();
  }
}
