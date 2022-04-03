import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type Mode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  modeSubject = new Subject<Mode>();
  modeSubject$ = this.modeSubject.asObservable();
}
