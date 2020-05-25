import { Component, OnInit } from '@angular/core';
import { DomainDTO } from '../models/domain.dto';
import { APIDomainService } from '../services/apidomain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notice-termination',
  templateUrl: './notice-termination.component.html',
  styleUrls: ['./notice-termination.component.css']
})
export class NoticeTerminationComponent implements OnInit {

  companies: DomainDTO[];
  public employees: DomainDTO[];

  totalPages:number = 0;
  currentPage:number = 1;
  action:string = '';

  error:any;
  
  constructor(private router: Router, private apiDomainService:APIDomainService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.apiDomainService.getDomains('companies').subscribe(
      (domains:DomainDTO[]) => {
        this.companies = domains;
      },
      (erro:any) => {
        this.error = erro;
        console.log(this.error);
      }
    );
  }

  public filterCompany():void{
    alert("Filtro");
  }

  private getEmployees():void{
    this.apiDomainService.getDomains('/employees/company/1?page=' + (this.currentPage - 1)).subscribe(
      (domains:DomainDTO[]) => {
        this.employees = domains['content'];
        this.totalPages = domains['totalPages'];
      },
      (erro:any) => {
        this.error = erro;
        console.log(this.error);
      }
    );
  }

  public first():void{
    this.currentPage = 1;
    this.getEmployees();
  }

  public rewind():void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.getEmployees();
    }
  }

  public forward():void{
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.getEmployees();
    }
  }

  public last():void{
    if(this.currentPage < this.totalPages){
      this.currentPage = this.totalPages;
      this.getEmployees();
    }
  }

  public edit(id:string){
    alert(id);
  }
}