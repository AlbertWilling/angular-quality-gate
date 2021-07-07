import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SightseeingPoint} from '../../models/sightseeing-point';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

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

  updateSight(id: string, sight: SightseeingPoint): Observable<SightseeingPoint> {
    return this.http.put<SightseeingPoint>(`${environment.apiUrl}/sights/${id}`, sight);
  }

  deleteSight(longitude: number, latitude: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/sights/?longitude=${longitude}&latitude=${latitude}`);
  }

  getIds(): Observable<string[]>{
    return this.http.get<SightseeingPoint[]>(`${environment.apiUrl}/sights`).pipe(
      map(results => {
        return results.map( (result: SightseeingPoint) => result.id);
      })
    );
  }
}
