import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomainDTO } from '../models/domain.dto';
import { Observable } from 'rxjs';
import { API_MF_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class APIDomainService {

  constructor(private httpClient:HttpClient) { }

  public getDomains(resource:string):Observable<DomainDTO[]>{
    return this.httpClient.get<DomainDTO[]>(`${API_MF_CONFIG.baseUrlDomain}/${resource}`);
  }
}
