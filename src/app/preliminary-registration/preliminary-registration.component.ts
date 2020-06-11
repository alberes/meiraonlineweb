import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet } from '@angular/router';
import { APIDomainService } from '../services/apidomain.service';
import { DomainDTO } from '../models/domain.dto';
import { APIPreliminaryRegistrationService } from '../services/apipreliminary-registration.service';
import { PreliminaryRegistrationDTO } from '../models/preliminaryregistration.dto';
import { MessageDTO } from '../models/message.dto';

@Component({
  selector: 'app-preliminary-registration',
  templateUrl: './preliminary-registration.component.html',
  styleUrls: ['./preliminary-registration.component.css']
})
export class PreliminaryRegistrationComponent implements OnInit {

  public title:string = 'Ficha de Cadastro Preliminar';
  
  public fGFilterCompany:FormGroup;
  public companies: DomainDTO[];
  public employees: DomainDTO[];
  private preliminaryRegistrationDTO:PreliminaryRegistrationDTO;

  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  modalOptions:NgbModalOptions;
  closeResult: string;
  
  public totalPages:number = 0;
  public currentPage:number = 0;
  public allowExport:boolean = false;
  
  public titleModal:string = '';
  public messageModal:string = '';
  public actiomModal:string = '';

  public status:number = -1;
  public message:string = '';

  private error:any;
  
  constructor(private formBuilder:FormBuilder, private modalService: NgbModal, private apiDomainService:APIDomainService,
    private apipreliminaryRegistrationService:APIPreliminaryRegistrationService) {
    this.fGFilterCompany = this.formBuilder.
      group({
        companyId: new FormControl(null, Validators.required),
        exported: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.preliminaryRegistrationDTO = new PreliminaryRegistrationDTO();
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

  public deleteMessage(id:string, name:string, content):void{
    this.preliminaryRegistrationDTO.id = id;
    this.apipreliminaryRegistrationService.getPreliminaryRegistration(`preliminaryregistrations/${this.preliminaryRegistrationDTO.id}`).
      subscribe((preliminaryRegistration:PreliminaryRegistrationDTO) => {
        if(preliminaryRegistration === null){
          this.titleModal = 'Alerta';
          this.messageModal = `Não existe o ${this.title} para o colaborador ${this.preliminaryRegistrationDTO.id} - ${name}`;
          this.actiomModal = 'alert';
        }else{
          this.preliminaryRegistrationDTO = preliminaryRegistration;
          this.titleModal = 'Alerta';
          this.messageModal = `Deseja exluir o ${this.title} do colaborador ${this.preliminaryRegistrationDTO.id} - ${this.preliminaryRegistrationDTO.name}?`;
          this.actiomModal = 'Excluir';
        }
      }
    );
    this.openAlert(content);
  }

  public delete():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.apipreliminaryRegistrationService.delete(`preliminaryregistrations/${this.preliminaryRegistrationDTO.id}`).
        subscribe((response) => {
          this.status = 0;
          this.message = `${this.title} excluído com sucesso.`;
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
    alert(id);
    this.preliminaryRegistrationDTO.id = id;
    this.apipreliminaryRegistrationService.getPreliminaryRegistration(`preliminaryregistrations/${this.preliminaryRegistrationDTO.id}`).
      subscribe((preliminaryRegistration:PreliminaryRegistrationDTO) => {
        if(preliminaryRegistration === null){
          this.titleModal = 'Alerta';
          this.messageModal = `Não existe o ${this.title} para o colaborador ${this.preliminaryRegistrationDTO.id} - ${name}.`;
          this.actiomModal = 'Alert';
        }else{
          this.preliminaryRegistrationDTO = preliminaryRegistration;
          this.titleModal = 'Alerta';
          this.messageModal = `Deseja exportar o ${this.title} do colaborador ${this.preliminaryRegistrationDTO.id} - ${this.preliminaryRegistrationDTO.name}?`;
          this.actiomModal = 'Exportar';
        }
      }
    );
    this.openAlert(content);
  }

  public export():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.apipreliminaryRegistrationService.export(`preliminaryregistrations/export/${this.preliminaryRegistrationDTO.id}`).
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
