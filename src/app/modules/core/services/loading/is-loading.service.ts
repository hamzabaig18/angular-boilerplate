import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsLoadingService {
  isLoading: Subject<boolean> = new Subject();
  constructor() {
    //this.isLoading.next(false);
  }
}
