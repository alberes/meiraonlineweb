import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SchoolCalendarDTO } from '../models/schoolcalendar.dto';
import { Observable } from 'rxjs';
import { API_MF_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class APISchoolCalendarService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  };

  constructor(private httpClient:HttpClient) { }

  public save(resource:string, schoolCalendarDTO:SchoolCalendarDTO):Observable<any>{
    return this.httpClient.post<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, schoolCalendarDTO, {observe: 'response'});
  }

  public getSchoolCalendar(resource:string):Observable<SchoolCalendarDTO>{
    return this.httpClient.get<SchoolCalendarDTO>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }

  public getSchoolCalendars(resource:string):Observable<SchoolCalendarDTO[]>{
    return this.httpClient.get<SchoolCalendarDTO[]>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }

  public update(resource:string, schoolCalendarDTO:SchoolCalendarDTO):Observable<any>{
    return this.httpClient.put<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, schoolCalendarDTO, this.httpOptions);
  }

  public export(resource:string):Observable<any>{
    return this.httpClient.patch<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, null, this.httpOptions);
  }

  public delete(resource:string):Observable<any>{
    return this.httpClient.delete<any>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }
}
