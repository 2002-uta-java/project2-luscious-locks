import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    isModeratorData = new EventEmitter<boolean>();
    isSignedInData = new EventEmitter<boolean>();

    homeClassData = new EventEmitter<string>();
    profileClassData = new EventEmitter<string>();

    moderatorHomeClassData = new EventEmitter<string>();
    moderatorUsersClassData = new EventEmitter<string>();
    moderatorCommentsClassData = new EventEmitter<string>();
} 