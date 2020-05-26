import { Component, OnInit, ViewChild } from '@angular/core';
import { DomainDTO } from '../models/domain.dto';
import { APIDomainService } from '../services/apidomain.service';
import { Router, RouterOutlet, ActivationStart } from '@angular/router';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-notice-termination',
  templateUrl: './notice-termination.component.html',
  styleUrls: ['./notice-termination.component.css']
})
export class NoticeTerminationComponent implements OnInit {

  companies: DomainDTO[];
  public employees: DomainDTO[];
  public message:string = '';

  fGFilterCompany:FormGroup;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  totalPages:number = 0;
  currentPage:number = 1;
  action:string = '';

  error:any;
  
  constructor(private router: Router, private formBuilder:FormBuilder, private apiDomainService:APIDomainService) {
    this.fGFilterCompany = this.formBuilder.group({
      companyId:[null, [Validators.required]],
      exported:[null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
        this.outlet.deactivate();
    });
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
    this.message = '';
    if(this.fGFilterCompany.value['companyId'] == null){
      this.message = 'Selecione uma empresa.';
    }else if(this.fGFilterCompany.value['exported'] == null){
      this.message = 'Selecione um filtro exportados Sim ou Não.';
    }else{
      this.getEmployees();
    }
  }

  private getEmployees():void{
    let resource:string = '/employees/company/'+this.fGFilterCompany.value['companyId']+
      '?exported='+this.fGFilterCompany.value['exported']+'&page=' + (this.currentPage - 1);
    this.apiDomainService.getDomains(resource).subscribe(
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