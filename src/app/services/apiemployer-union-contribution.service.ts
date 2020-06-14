import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployerUnionContributionDTO } from '../models/employerunioncontribution.dto';
import { Observable } from 'rxjs';
import { API_MF_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class APIEmployerUnionContributionService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  };

    constructor(private httpClient:HttpClient) { }

  public save(resource:string, employerUnionContributionDTO:EmployerUnionContributionDTO):Observable<any>{
    return this.httpClient.post<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, employerUnionContributionDTO, {observe: 'response'});
  }

  public getEmployerUnionContribution(resource:string):Observable<EmployerUnionContributionDTO>{
    return this.httpClient.get<EmployerUnionContributionDTO>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }

  public getEmployersUnionContributionDTO(resource:string):Observable<EmployerUnionContributionDTO[]>{
    return this.httpClient.get<EmployerUnionContributionDTO[]>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }

  public update(resource:string, employerUnionContributionDTO:EmployerUnionContributionDTO):Observable<any>{
    return this.httpClient.put<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, employerUnionContributionDTO, this.httpOptions);
  }

  public export(resource:string):Observable<any>{
    return this.httpClient.patch<any>(`${API_MF_CONFIG.baseUrl}/${resource}`, null, this.httpOptions);
  }

  public delete(resource:string):Observable<any>{
    return this.httpClient.delete<any>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }
}