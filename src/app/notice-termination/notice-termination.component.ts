import { Component, OnInit, ViewChild } from '@angular/core';
import { DomainDTO } from '../models/domain.dto';
import { APIDomainService } from '../services/apidomain.service';
import { Router, RouterOutlet, ActivationStart } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { APINoticeTerminationService } from '../services/apinotice-termination.service';
import { NoticeTerminationDTO } from '../models/noticetermination.dto';
import { MessageDTO } from '../models/message.dto';

@Component({
  selector: 'app-notice-termination',
  templateUrl: './notice-termination.component.html',
  styleUrls: ['./notice-termination.component.css']
})
export class NoticeTerminationComponent implements OnInit {

  public title:string = 'Aviso Prévio Trabalhado / Idenizado';
  public companies: DomainDTO[];
  public employees: DomainDTO[];

  public fGFilterCompany:FormGroup;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  modalOptions:NgbModalOptions;
  closeResult: string;

  public titleModal:string = '';
  public messageModal:string = '';
  public actiomModal:string = '';

  public totalPages:number = 0;
  public currentPage:number = 0;
  public allowExport:boolean = false;

  public employeeId:string = '';
  public status:number = -1;
  public message:string = '';

  error:any;
  
  constructor(private router: Router, private formBuilder:FormBuilder, private modalService: NgbModal, private apiDomainService:APIDomainService,
     private apiNoticeTerminationService:APINoticeTerminationService) {
    this.fGFilterCompany = this.formBuilder.
      group({
        companyId: new FormControl(null, Validators.required),
        exported: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
        this.outlet.deactivate();
    });
    this.apiDomainService.getDomains('companies').
      subscribe((domains:DomainDTO[]) => {
        this.companies = domains;
      },
      (error:any) => {
        this.error = error;
        console.log(this.error);
      }
    );
  }

  public filterCompany():void{
    this.currentPage = 1;
    if(this.fGFilterCompany.value['exported'] === 'N'){
      this.allowExport = true;
    }
    this.getEmployees();
  }
  
  private getEmployees():void{
    let resource:string = `employees/company/${this.fGFilterCompany.value['companyId']}?exported=${this.fGFilterCompany.value['exported']}&page=${(this.currentPage - 1)}`;
    this.apiDomainService.getDomains(resource).
      subscribe((domains:DomainDTO[]) => {
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

  public deleteMessage(id:string, name:string, content):void{
    this.employeeId = id;
    this.apiNoticeTerminationService.getNoticeTermination(`terminationotices/employee/${this.employeeId}`).
      subscribe((noticeTermination:NoticeTerminationDTO) => {
        if(noticeTermination === null){
          this.titleModal = 'Alerta';
          this.messageModal = `Não existe o ${this.title} para o colaborador ${this.employeeId} - ${name}`;
          this.actiomModal = 'alert';
        }else{
          this.titleModal = 'Alerta';
          this.messageModal = `Deseja exluir o ${this.title} do colaborador ${this.employeeId} - ${name}?`;
          this.actiomModal = 'Excluir';
        }
      }
    );
    this.openAlert(content);
  }

  public delete():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.apiNoticeTerminationService.delete(`terminationotices/${this.employeeId}`).
        subscribe((response) => {
          this.status = 0;
          this.message = '${this.title} excluído com sucesso.';
        },
        error => {
          this.status = 1;
          this.message = `Erro ao tentar excluir o ${this.title}.`;
          console.log(error);
        }
      )
    }
  }

  public exportMessage(id:string, name:string, content):void{
    this.employeeId = id;
    this.apiNoticeTerminationService.getNoticeTermination(`terminationotices/employee/${this.employeeId}`).
      subscribe((noticeTermination:NoticeTerminationDTO) => {
        if(noticeTermination === null){
          this.titleModal = 'Alerta';
          this.messageModal = `Não existe o ${this.title} para o colaborador ${this.employeeId} - ${name}.`;
          this.actiomModal = 'Alert';
        }else{
          this.titleModal = 'Alerta';
          this.messageModal = `Deseja exportar o ${this.title} do colaborador ${this.employeeId} - ${name}?`;
          this.actiomModal = 'Exportar';
        }
      }
    );
    this.openAlert(content);
  }

  public export():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.apiNoticeTerminationService.export(`terminationotices/export/${this.employeeId}`).
      subscribe((response:MessageDTO) => {
          if(response.status === 'OK'){
            this.status = 0;
            this.message = `${this.title} exportado com sucesso.`;
          }else{
            this.status = 1;
            this.message = `Não foi encontrado ${this.title}.`;
          }          
          this.getEmployees();
        },
        error => {
          this.status = 1;
          this.message = `Erro ao tentar exportar o ${this.title}.`;
          console.log(error);
        }
      )
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

  public fGFilterCompanyField(field:string):any{
    return this.fGFilterCompany.get(field);
  }
  
}