import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    isSignedInData = new EventEmitter<boolean>();
    homeClassData = new EventEmitter<string>();
    profileClassData = new EventEmitter<string>();
} 