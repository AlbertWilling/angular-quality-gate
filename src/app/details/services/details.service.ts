import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SightseeingPoint} from '../../models/sightseeing-point';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) {
  }

  getSight(longitude: number, latitude: number): Observable<SightseeingPoint> {
    return this.http.get<SightseeingPoint>(`${environment.apiUrl}/sights/?longitude=${longitude}&latitude=${latitude}`);
  }

  addSight(sight: SightseeingPoint): Observable<SightseeingPoint>{
    return this.http.post<SightseeingPoint>(`${environment.apiUrl}/sights`, sight);
  }

  updateSight(sight: SightseeingPoint, longitude: string, latitude: string): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/sights/?longitude=${longitude}&latitude=${latitude}`, sight);
  }

  deleteSight(longitude: number, latitude: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/sights/?longitude=${longitude}&latitude=${latitude}`);
  }

}
