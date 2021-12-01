import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertBarService {
  showAlert: Subject<string> = new Subject();
  constructor() {}
}
