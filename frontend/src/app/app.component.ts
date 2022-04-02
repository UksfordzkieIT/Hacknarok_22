import { Component, HostBinding } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { EventBusService } from './services/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') className = '';
  themeModeSubscription!: Subscription;
  theme: 'light' | 'dark' = 'light';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private eventBus: EventBusService
  ) {
    this.themeModeSubscription = eventBus.modeSubject$.subscribe((val) =>
      this.themeModeChanged(val)
    );
  }

  themeModeChanged(val: 'light' | 'dark'): void {
    this.className = val === 'dark' ? 'dark-theme' : '';
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
