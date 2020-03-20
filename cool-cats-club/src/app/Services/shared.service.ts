import { UserSessionService } from './user-session.service';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SharedService {

    constructor(private userSession: UserSessionService){}

    isSignedInData:boolean = (this.userSession.getToken)?true:false; /*= new EventEmitter<boolean>();*/
} 