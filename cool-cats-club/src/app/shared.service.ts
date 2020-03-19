import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    isSignedInData = new EventEmitter<boolean>();
} 