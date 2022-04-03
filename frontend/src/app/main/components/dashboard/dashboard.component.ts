import { Component, HostBinding } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EventBusService } from '../../../services/event-bus.service';
import { Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomDateRange } from '../date-range/date-range.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @HostBinding('class') className = '';

  themeModeSubscription: Subscription;
  dashboardType!: 'fabryka' | 'sklep';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private eventBus: EventBusService,
    private overlay: OverlayContainer,
    private router: Router
  ) {
    this.themeModeSubscription = eventBus.modeSubject$.subscribe((val) =>
      this.changeThemeMode(val)
    );
    this.dashboardType = this.router.url.split('/')[2] as 'fabryka' | 'sklep';
  }

  changeThemeMode(val: 'light' | 'dark'): void {
    this.className = val === 'dark' ? 'dark-theme' : '';
    if (val === 'dark') {
      this.overlay.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlay.getContainerElement().classList.remove('dark-theme');
    }
  }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (this.dashboardType === 'fabryka') {
        return [
          { title: 'Wykres', cols: matches ? 2 : 1, rows: 1, type: 'chart' },
        ];
      }
      if (this.dashboardType === 'sklep') {
        return [
          { title: 'Wykres', cols: matches ? 2 : 1, rows: 1, type: 'chart' },
          { title: 'Heatmap', cols: 1, rows: 1, type: 'heatmap' },
        ];
      }
      return [];
    })
  );

  mock(e: CustomDateRange): void {
    console.log(e);
  }
}
