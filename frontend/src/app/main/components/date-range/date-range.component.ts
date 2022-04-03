import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { EventBusService } from '../../../services/event-bus.service';
import { Subscription } from 'rxjs';

export interface CustomDateRange {
  dateStart: Date;
  dateEnd: Date;
  hourStart: number;
  hourEnd: number;
}

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent implements OnInit {
  @Output() dateRangeEvent = new EventEmitter<CustomDateRange>();
  @HostBinding('class') className = '';

  range = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
    hourStart: new FormControl(8),
    hourEnd: new FormControl(16),
  });
  hourStartInvalid = false;
  hourEndInvalid = false;
  themeModeSubscription: Subscription;
  theme = 'light';

  constructor(
    private eventBus: EventBusService,
    private overlay: OverlayContainer
  ) {
    this.themeModeSubscription = eventBus.modeSubject$.subscribe((val) =>
      this.changeThemeMode(val)
    );
  }

  ngOnInit(): void {
    this.range.controls['hourStart'].valueChanges.subscribe((val) => {
      this.hourStartInvalid =
        val < 0 || val > this.range.controls['hourEnd'].value;
    });
    this.range.controls['hourEnd'].valueChanges.subscribe((val) => {
      this.hourEndInvalid =
        val > 24 || val < this.range.controls['hourStart'].value;
    });
  }

  prevent(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

  confirm(): void {
    const dateRange: CustomDateRange = {
      dateStart: this.range.controls['start'].value,
      dateEnd: this.range.controls['end'].value,
      hourStart: this.range.controls['hourStart'].value,
      hourEnd: this.range.controls['hourEnd'].value,
    };
    this.dateRangeEvent.next(dateRange);
  }

  changeThemeMode(val: 'light' | 'dark'): void {
    this.theme = val;
    this.className = val === 'dark' ? 'dark-theme' : '';
    if (val === 'dark') {
      this.overlay.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlay.getContainerElement().classList.remove('dark-theme');
    }
  }
}
