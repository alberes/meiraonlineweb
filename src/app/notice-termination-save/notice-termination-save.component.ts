import { Component, OnInit } from '@angular/core';
import { DomainDTO } from '../models/domain.dto';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APIDomainService } from '../services/apidomain.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { APINoticeTerminationService } from '../services/apinotice-termination.service';
import { NoticeTerminationDTO } from '../models/noticetermination.dto';
import { Employee } from '../models/employee.dto';

@Component({
  selector: 'app-notice-termination-save',
  templateUrl: './notice-termination-save.component.html',
  styleUrls: ['./notice-termination-save.component.css']
})
export class NoticeTerminationSaveComponent implements OnInit {

  public title:string = 'Aviso Prévio Trabalhado / Idenizado';
  public employees: Array<DomainDTO> = [];
  public typesNotices: DomainDTO[];
  public reasonsNotices: DomainDTO[];
  public typesNoticesWorked: DomainDTO[];
  public reasonsCancelingNotice: DomainDTO[];
  public noticeTerminationDTO:NoticeTerminationDTO;

  modalOptions:NgbModalOptions;
  closeResult: string;

  titleModal:string = '';
  messageModal:string = '';
  actiomModal:string = '';

  public status:number = -1;
  public message:string = '';

  private totalPages:number = 0;
  private currentPage:number = 0;

  public fGNoticeTermination:FormGroup;
  private employeeId:string;
  private error:any;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder:FormBuilder, private modalService: NgbModal, 
    private apiDomainService:APIDomainService, private apiNoticeTerminationService:APINoticeTerminationService) {
    this.fGNoticeTermination = this.formBuilder.group({
      employeeId: new FormControl({value: null, disabled: true}, Validators.required),
      noticeReasonId: new FormControl(null, Validators.required),
      noticeDate: new FormControl(null, Validators.required),
      lastDay: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),  
      noticeStatus: new FormControl(null, Validators.required),
      noticeTypeId: new FormControl(null, Validators.required),
      cancelDate: new FormControl(null, Validators.required),
      noticeTypeWorkedId: new FormControl(null, Validators.required),
      cancelNoticeReasonId: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.apiDomainService.getDomains('typesnotices').subscribe(
      (domains:DomainDTO[]) => {
        this.typesNotices = domains;
      },
      (error:any) => {
        this.error = error;
        console.log(this.error);
      }
    );
    this.apiDomainService.getDomains('reasonsnotices').subscribe(
      (domains:DomainDTO[]) => {
        this.reasonsNotices = domains;
      },
      (error:any) => {
        this.error = error;
        console.log(this.error);
      }
    );
    this.apiDomainService.getDomains('typesnoticesworked').subscribe(
      (domains:DomainDTO[]) => {
        this.typesNoticesWorked = domains;
      },
      (error:any) => {
        this.error = error;
        console.log(this.error);
      }
    );
    this.apiDomainService.getDomains('reasonscancelingnotices').subscribe(
      (domains:DomainDTO[]) => {
        this.reasonsCancelingNotice = domains;
      },
      (error:any) => {
        this.error = error;
        console.log(this.error);
      }
    );
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.employeeId = params.get('employeeId');
    });
    if(this.employeeId !== null){
      this.apiNoticeTerminationService.getNoticeTermination(`terminationotices/employee/${this.employeeId}`).
        subscribe((noticeTermination:NoticeTerminationDTO) => {
          this.noticeTerminationDTO = noticeTermination;
          if(this.noticeTerminationDTO !== null){
            this.fillEmployees(null);
            this.tofGNoticeTermination();
            this.messageModal = `Deseja atualizar o Aviso Prévio Trabalhado / Idenizado?`;
            this.actiomModal = 'Atualizar';
          }else{         
            this.messageModal = `Deseja salvar o Aviso Prévio Trabalhado / Idenizado?`;
            this.actiomModal = 'Salvar';
            this.noticeTerminationDTO = new NoticeTerminationDTO();
            this.noticeTerminationDTO.employee = new Employee();
            this.getEmployee();
            this.tofGNoticeTermination();
          }
        },
        (error:any) => {
          this.error = error;
          console.log(this.error);
        }
      );
    }else{
      console.log('Not found employeeId');
    }
  }

  public saveMessage(content):void{
    if(this.fGNoticeTermination.get('noticeReasonId').invalid || this.fGNoticeTermination.get('noticeDate').invalid ||
      this.fGNoticeTermination.get('lastDay').invalid || this.fGNoticeTermination.get('endDate').invalid ||
      this.fGNoticeTermination.get('noticeStatus').invalid || this.fGNoticeTermination.get('noticeTypeId').invalid ||
      this.fGNoticeTermination.get('noticeTypeWorkedId').invalid || this.fGNoticeTermination.get('cancelDate').invalid ||
      this.fGNoticeTermination.get('cancelNoticeReasonId').invalid){
      this.status = 1;
    }else{
      this.titleModal = 'Alerta';    
      this.openAlert(content);
    }
  }

  public save(){
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();      
      this.toNoticeTerminationDTO();
      if(this.actiomModal === 'Atualizar'){
        this.apiNoticeTerminationService.update(`terminationotices/${this.noticeTerminationDTO.id}`, this.noticeTerminationDTO).
        subscribe((response) => {
            this.status = 0;
            this.message = 'Aviso Prévio Trabalhado / Idenizado atualizado com sucesso';
          },
            error => {
              this.status = 2;
              this.message = 'Erro ao tentar atualizar o Prévio Trabalhado / Idenizado';
              console.log(error);
            }
          );
      }else{
        this.noticeTerminationDTO.export = 'N';
        this.apiNoticeTerminationService.save(`terminationotices`, this.noticeTerminationDTO).
        subscribe((response) => {
            this.status = 0;
            this.message = 'Aviso Prévio Trabalhado / Idenizado criado com sucesso';
            this.actiomModal = 'Atualizar';
            this.noticeTerminationDTO.id = this.getId(response.headers.get('location'));
          },
          error => {
            this.status = 2;
            this.message = 'Erro ao tentar criar o Prévio Trabalhado / Idenizado';
            this.error = error;
            console.log(this.error);
          }
        )
      }
    }
  }

  private getId(location:string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

  private getEmployee():void{
    let resource:string = `employees/${this.employeeId}`;
    this.apiDomainService.getEmployee(resource).
      subscribe((domain:DomainDTO) => {
        this.fillEmployees(domain);
      },
      (error:any) => {
        this.error = error;
        console.log(this.error);
      }
    );
  }

  private fillEmployees(domain:DomainDTO):void{
    if(domain === null){
      this.employees.push({
        id: this.noticeTerminationDTO.employee.id + '',
        name: this.noticeTerminationDTO.employee.name,
        value: ''
      });
    }else{
      this.employees.push({
        id: domain.id,
        name: domain.name,
        value: ''
      });
    }
  }

  private toNoticeTerminationDTO():void{
    this.noticeTerminationDTO.noticeReasonId = this.fGNoticeTermination.value['noticeReasonId'];
    this.noticeTerminationDTO.noticeDate = this.fGNoticeTermination.value['noticeDate'];
    this.noticeTerminationDTO.lastDay = this.fGNoticeTermination.value['lastDay'];
    this.noticeTerminationDTO.endDate = this.fGNoticeTermination.value['endDate'];     
    this.noticeTerminationDTO.noticeStatus = this.fGNoticeTermination.value['noticeStatus'];
    this.noticeTerminationDTO.noticeTypeId = this.fGNoticeTermination.value['noticeTypeId'];
    this.noticeTerminationDTO.cancelDate = this.fGNoticeTermination.value['cancelDate'];
    this.noticeTerminationDTO.noticeTypeWorkedId = this.fGNoticeTermination.value['noticeTypeWorkedId'];
    this.noticeTerminationDTO.cancelNoticeReasonId = this.fGNoticeTermination.value['cancelNoticeReasonId'];
    this.noticeTerminationDTO.employee.id = this.employeeId;
  }

  private tofGNoticeTermination():void{
    this.fGNoticeTermination = this.formBuilder.group({
      employeeId:[this.employeeId, [Validators.required]],
      noticeReasonId:[this.noticeTerminationDTO.noticeReasonId, [Validators.required]],
      noticeDate:[this.noticeTerminationDTO.noticeDate, [Validators.required]],
      lastDay:[this.noticeTerminationDTO.lastDay, [Validators.required]],
      endDate:[this.noticeTerminationDTO.endDate, [Validators.required]],      
      noticeStatus:[this.noticeTerminationDTO.noticeStatus, [Validators.required]],
      noticeTypeId:[this.noticeTerminationDTO.noticeTypeId, [Validators.required]],
      cancelDate:[this.noticeTerminationDTO.cancelDate, [Validators.required]],
      noticeTypeWorkedId:[this.noticeTerminationDTO.noticeTypeWorkedId, [Validators.required]],
      cancelNoticeReasonId:[this.noticeTerminationDTO.cancelNoticeReasonId, [Validators.required]]
    });
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

  public fGNoticeTerminationField(field:string):any{
    return this.fGNoticeTermination.get(field);
  }
    
}
