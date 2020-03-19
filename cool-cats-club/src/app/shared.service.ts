import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    isLoggedInData = new EventEmitter<boolean>();
} 