import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomainDTO } from '../models/domain.dto';
import { EmployerUnionContributionDTO } from '../models/employerunioncontribution.dto';
import { MessageDTO } from '../models/message.dto';
import { RouterOutlet } from '@angular/router';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { APIDomainService } from '../services/apidomain.service';
import { APIEmployerUnionContributionService } from '../services/apiemployer-union-contribution.service';

@Component({
  selector: 'app-employer-union-contribution',
  templateUrl: './employer-union-contribution.component.html',
  styleUrls: ['./employer-union-contribution.component.css']
})
export class EmployerUnionContributionComponent implements OnInit {

  public title:string = 'Contribuição Sindical Patronal';
  private resource:string = 'employersunioncontribution';

  public fGFilterCompany:FormGroup;
  public companies: DomainDTO[];
  public employersUnionContribution: DomainDTO[];
  private employerUnionContributionDTO:EmployerUnionContributionDTO;

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
    private apiEmployerUnionContributionService:APIEmployerUnionContributionService) {
      this.fGFilterCompany = this.formBuilder.
      group({
        companyId: new FormControl(null, Validators.required),
        exported: new FormControl(null, Validators.required)
      });
    }

  ngOnInit(): void {
    this.employerUnionContributionDTO = new EmployerUnionContributionDTO();
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
    this.getEmployersUnionContribution();
  }

  private getEmployersUnionContribution():void{
    let resourceList:string = `${this.resource}/company/${this.fGFilterCompany.value['companyId']}?exported=${this.fGFilterCompany.value['exported']}&page=${(this.currentPage - 1)}`;
    this.apiEmployerUnionContributionService.getEmployersUnionContributionDTO(resourceList).
      subscribe((domains:EmployerUnionContributionDTO[]) => {
        this.employersUnionContribution = domains['content'];
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
    this.getEmployersUnionContribution();
  }

  public rewind():void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.getEmployersUnionContribution();
    }
  }

  public forward():void{
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.getEmployersUnionContribution();
    }
  }

  public last():void{
    if(this.currentPage < this.totalPages){
      this.currentPage = this.totalPages;
      this.getEmployersUnionContribution();
    }
  }

  public deleteMessage(id:string, name:string, content):void{
    this.employerUnionContributionDTO.id = id;
    this.apiEmployerUnionContributionService.getEmployerUnionContribution(`${this.resource}/${this.employerUnionContributionDTO.id}`).
      subscribe((employerUnionContribution:EmployerUnionContributionDTO) => {
        if(employerUnionContribution === null){
          this.titleModal = 'Alerta';
          this.messageModal = `Não existe o ${this.title} ${this.employerUnionContributionDTO.id} - ${name}`;
          this.actiomModal = 'alert';
        }else{
          this.employerUnionContributionDTO = employerUnionContribution;
          this.titleModal = 'Alerta';
          this.messageModal = `Deseja exluir o ${this.title} ${this.employerUnionContributionDTO.id} - ${this.employerUnionContributionDTO.name}?`;
          this.actiomModal = 'Excluir';
        }
      }
    );
    this.openAlert(content);
  }

  public delete():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.apiEmployerUnionContributionService.delete(`${this.resource}/${this.employerUnionContributionDTO.id}`).
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
    this.employerUnionContributionDTO.id = id;
    this.apiEmployerUnionContributionService.getEmployerUnionContribution(`${this.resource}/${this.employerUnionContributionDTO.id}`).
      subscribe((employerUnionContribution:EmployerUnionContributionDTO) => {
        if(employerUnionContribution === null){
          this.titleModal = 'Alerta';
          this.messageModal = `Não existe o ${this.title} ${this.employerUnionContributionDTO.id} - ${name}.`;
          this.actiomModal = 'Alert';
        }else{
          this.employerUnionContributionDTO = employerUnionContribution;
          this.titleModal = 'Alerta';
          this.messageModal = `Deseja exportar o ${this.title} ${this.employerUnionContributionDTO.id} - ${this.employerUnionContributionDTO.name}?`;
          this.actiomModal = 'Exportar';
        }
      }
    );
    this.openAlert(content);
  }

  public export():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.apiEmployerUnionContributionService.export(`${this.resource}/export/${this.employerUnionContributionDTO.id}`).
      subscribe((response:MessageDTO) => {
          if(response.status === 'OK'){
            this.status = 0;
            this.message = `${this.title} exportado com sucesso.`;
          }else{
            this.status = 1;
            this.message = `Não foi encontrado ${this.title}.`;
          }          
          this.getEmployersUnionContribution();
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
