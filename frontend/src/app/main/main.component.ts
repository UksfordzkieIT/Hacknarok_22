import { Component, HostBinding } from '@angular/core';
import { filter, Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { EventBusService } from '../services/event-bus.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Route,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  @HostBinding('class') className = '';
  themeModeSubscription!: Subscription;
  theme: 'light' | 'dark' = 'light';
  currentPath = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private eventBus: EventBusService,
    private router: Router
  ) {
    this.themeModeSubscription = eventBus.modeSubject$.subscribe((val) =>
      this.themeModeChanged(val)
    );
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((val) => {
        const value = val as NavigationEnd;
        this.currentPath = value.urlAfterRedirects.split('/')[2].toUpperCase();
      });
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
