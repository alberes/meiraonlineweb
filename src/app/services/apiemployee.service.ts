import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.dto';
import { API_MF_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class APIEmployeeService {

  constructor(private httpClient:HttpClient) { }

  public getEmployee(resource:string):Observable<Employee>{
    return this.httpClient.get<Employee>(`${API_MF_CONFIG.baseUrl}/${resource}`);
  }
}
