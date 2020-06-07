import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NoticeTerminationDTO } from '../models/noticetermination.dto';
import { Observable } from 'rxjs';
import { API_MF_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class APINoticeTerminationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  };

  constructor(private httpClient:HttpClient) { }

  public save(resource:string, noticeTermination:NoticeTerminationDTO):Observable<any>{
    return this.httpClient.post<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, noticeTermination, { observe: 'response' });
  }

  public getNoticeTermination(resource:string):Observable<NoticeTerminationDTO>{
    return this.httpClient.get<NoticeTerminationDTO>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }

  public update(resource:string, noticeTermination:NoticeTerminationDTO):Observable<any>{
    return this.httpClient.put<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, noticeTermination, this.httpOptions);
  }

  public export(resource:string):Observable<any>{
    return this.httpClient.patch<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, null, this.httpOptions);
  }

  public delete(resource:string):Observable<any>{
    return this.httpClient.delete<any>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }
}
