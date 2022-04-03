import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StatStoreData } from '../models/models';
import { CustomDateRange } from '../main/components/date-range/date-range.component';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly ADDRESS = 'http://172.20.15.169:8000/';
  private readonly URL = 'stat_store/1/get_stat_timeline_store/';

  constructor(protected http: HttpClient) {}

  getStringCorrect(d: number): string {
    return d > 10 ? `${d}` : `0${d}`;
  }

  getDateString(ds: Date): string {
    const day = this.getStringCorrect(ds.getDate());
    const month = this.getStringCorrect(ds.getMonth() + 1);
    const year = this.getStringCorrect(ds.getFullYear());
    return `${day}.${month}.${year}`;
  }

  getDataForChart(range: CustomDateRange): Observable<StatStoreData> {
    const FULL_URL = this.ADDRESS + this.URL;
    const dateRangeStr = `${this.getDateString(
      range.dateStart
    )} - ${this.getDateString(range.dateEnd)}`;
    return this.http.get<StatStoreData>(FULL_URL, {
      params: {
        params: dateRangeStr,
      },
    });
  }
}
