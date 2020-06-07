import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_MF_CONFIG } from '../config/api.config';
import { SickLeaveDTO } from '../models/sickleave.dto';

@Injectable({
  providedIn: 'root'
})
export class APISickLeaveService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  };

  constructor(private httpClient:HttpClient) { }
  
  public save(resource:string, sickLeaveDTO:SickLeaveDTO):Observable<any>{
    return this.httpClient.post<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, sickLeaveDTO, {observe: 'response'});
  }
  
  public getSickLeave(resource:string):Observable<SickLeaveDTO>{
    return this.httpClient.get<SickLeaveDTO>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }

  public getSickLeaveByEmployee(resource:string):Observable<SickLeaveDTO[]>{
    return this.httpClient.get<SickLeaveDTO[]>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }
  
  public update(resource:string, sickLeaveDTO:SickLeaveDTO):Observable<any>{
    return this.httpClient.put<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, sickLeaveDTO, this.httpOptions);
  }

  public export(resource:string):Observable<any>{
    return this.httpClient.patch<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, null, this.httpOptions);
  }

  public delete(resource:string):Observable<any>{
    return this.httpClient.delete<any>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }
}
