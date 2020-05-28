import { Component, OnInit, ViewChild } from '@angular/core';
import { DomainDTO } from '../models/domain.dto';
import { APIDomainService } from '../services/apidomain.service';
import { Router, RouterOutlet, ActivationStart } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

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
  modalOptions:NgbModalOptions;
  closeResult: string;

  titleModal:string = '';
  messageModal:string = '';
  actiomModal:string = '';

  totalPages:number = 0;
  currentPage:number = 1;
  action:string = '';
  employeeId:string = '';

  error:any;
  
  constructor(private router: Router, private formBuilder:FormBuilder, private modalService: NgbModal, private apiDomainService:APIDomainService) {
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
      (error:any) => {
        this.error = error;
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
      this.currentPage = 1;
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
      (error:any) => {
        this.error = error;
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

  public goSave():void{
    this.router.navigate(['notice-termination-save']);
  }

  public edit(id:string){
    alert(id);
  }

  public deleteMessage(id:string, name:string, content):void{
    this.titleModal = 'Alerta';
    this.messageModal = `Deseja exluir o registro ${id} - ${name}?`;
    this.actiomModal = 'Excluir';
    this.employeeId = id;
    this.openAlert(content);
  }

  public delete():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.message = 'Empregado excluído com sucesso';
    }
  }

  public exportMessage(id:string, name:string, content):void{
    this.titleModal = 'Alerta';
    this.messageModal = `Deseja exportar o registro ${id} - ${name}?`;
    this.actiomModal = 'Exportar';
    this.employeeId = id;
    this.openAlert(content);
  }

  public export():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.message = 'Empregado exportado com sucesso';
    }
  }

  public openAlert(content):void{
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
}