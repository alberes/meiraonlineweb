import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { APIDomainService } from '../services/apidomain.service';
import { DomainDTO } from '../models/domain.dto';
import { APISickLeaveService } from '../services/apisick-leave.service';
import { SickLeaveDTO } from '../models/sickleave.dto';
import { MessageDTO } from '../models/message.dto';

@Component({
  selector: 'app-sick-leave',
  templateUrl: './sick-leave.component.html',
  styleUrls: ['./sick-leave.component.css']
})
export class SickLeaveComponent implements OnInit {

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
  public currentPage:number = 1;
  public allowExport:boolean = false;

  public employeeId:string = '';
  public status:number = -1;
  public message:string = '';

  error:any;

  constructor(private router: Router, private formBuilder:FormBuilder, private modalService: NgbModal, private apiDomainService:APIDomainService,
    private apiSickLeaveService:APISickLeaveService) {
    this.fGFilterCompany = this.formBuilder.
      group({
        companyId: new FormControl(null, Validators.required),
        exported: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    /*this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
        this.outlet.deactivate();
    });*/
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

  get companyId():any{
    return this.fGFilterCompany.get('companyId');
  }

  get exported():any{
    return this.fGFilterCompany.get('exported');
  }

  public exportMessage(id:string, name:string, content):void{
    this.employeeId = id;
    this.apiSickLeaveService.getSickLeave(`sickleaves/employee/${this.employeeId}`).
      subscribe((sickleaves:any) => {
        let total:number = Number(sickleaves['totalElements']);
        if(total === 0){
          this.messageModal = `Não existe o Afastamento Temporário para o colaborador ${this.employeeId} - ${name}`;
          this.actiomModal = 'alert';
        }else{
          this.titleModal = 'Alerta';
          this.messageModal = `Deseja exportar o Afastamento Temporário do colaborador ${this.employeeId} - ${name}?`;
          this.actiomModal = 'Exportar';
        }
      }
    );
    this.openAlert(content);
  }

  private getEmployees():void{
    let resource:string = 'employees/company/'+this.fGFilterCompany.value['companyId']+
      '?exported='+this.fGFilterCompany.value['exported']+'&page=' + (this.currentPage - 1);
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


  public export():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.apiSickLeaveService.export(`sickleaves/export/${this.employeeId}`).
      subscribe((response:MessageDTO) => {
        this.status = 0;
        if(response.status === 'OK'){
          this.message = 'Afastamento Temporário exportado com sucesso.';
        }else{
          this.status = 1;
          this.message = 'Não foi encontrado Afastamento Temporário.';
        }
          this.getEmployees();
        },
        error => {
          this.status = 1;
          this.message = 'Erro ao tentar exportar o Afastamento Temporário';
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

}
