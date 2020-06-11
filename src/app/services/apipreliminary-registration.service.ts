import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreliminaryRegistrationDTO } from '../models/preliminaryregistration.dto';
import { API_MF_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class APIPreliminaryRegistrationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  };

  constructor(private httpClient:HttpClient) { }

  public save(resource:string, preliminaryRegistrationDTO:PreliminaryRegistrationDTO):Observable<any>{
    return this.httpClient.post<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, preliminaryRegistrationDTO, {observe: 'response'});
  }

  public getPreliminaryRegistration(resource:string):Observable<PreliminaryRegistrationDTO>{
    return this.httpClient.get<PreliminaryRegistrationDTO>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }

  public update(resource:string, preliminaryRegistrationDTO:PreliminaryRegistrationDTO):Observable<any>{
    return this.httpClient.put(`${API_MF_CONFIG.baseUrl}/${resource}`, preliminaryRegistrationDTO, this.httpOptions);
  }

  public export(resource:string):Observable<any>{
    return this.httpClient.patch<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, null, this.httpOptions);
  }

  public delete(resource:string):Observable<any>{
    return this.httpClient.delete<any>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }
}
