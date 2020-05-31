import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NoticeTerminationDTO } from '../models/noticetermination.dto';
import { Observable, throwError } from 'rxjs';
import { API_MF_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class APINoticeTerminationService {

  public meiraError:any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private httpClient:HttpClient) { }

  public create(resource:string, noticeTermination:NoticeTerminationDTO):Observable<any>{
    return this.httpClient.post<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, JSON.stringify(noticeTermination), this.httpOptions);
  }

  public getNoticeTermination(resource:string):Observable<NoticeTerminationDTO>{
    return this.httpClient.get<NoticeTerminationDTO>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }

  public update(resource:string, noticeTermination:NoticeTerminationDTO):Observable<any>{
    return this.httpClient.put<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, JSON.stringify(noticeTermination), this.httpOptions);
  }

  public export(resource:string, exportNoticeTermination:string):Observable<any>{
    let bodyNotification = {
      'export': exportNoticeTermination
    }
    return this.httpClient.patch<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, JSON.stringify(bodyNotification), this.httpOptions);
  }

  public delete(resource:string):Observable<any>{
    return this.httpClient.delete<any>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }
}
