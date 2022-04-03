import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StatStoreData } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly ADDRESS = 'http://172.20.15.169:8000/';
  private readonly URL = 'stat_store/1/get_stat_timeline_store/';

  constructor(protected http: HttpClient) {}

  getDataForChart(): Observable<StatStoreData> {
    const FULL_URL = this.ADDRESS + this.URL;
    return this.http.get<StatStoreData>(FULL_URL, {
      params: {
        params: '28.03.2022 - 28.03.2022',
      },
    });
  }
}
