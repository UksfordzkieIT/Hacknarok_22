import { Component, HostBinding } from '@angular/core';
import { EventBusService } from '../../services/event-bus.service';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss'],
})
export class DarkModeToggleComponent {
  @HostBinding('class') className = '';

  constructor(public eventBus: EventBusService) {}

  selectedVal = 'light';

  onValChange(val: 'light' | 'dark'): void {
    this.selectedVal = val;
    this.className = val === 'dark' ? 'dark-theme' : '';
    this.eventBus.modeSubject.next(val);
  }
}
