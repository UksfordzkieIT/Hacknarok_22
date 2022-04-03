import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  range = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
    hourStart: new FormControl(8),
    hourEnd: new FormControl(16),
  });
  hourStartInvalid = false;
  hourEndInvalid = false;

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
}
