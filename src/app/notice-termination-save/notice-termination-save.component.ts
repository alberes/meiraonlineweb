import { Component, OnInit } from '@angular/core';
import { DomainDTO } from '../models/domain.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APIDomainService } from '../services/apidomain.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { APINoticeTerminationService } from '../services/apinotice-termination.service';
import { NoticeTerminationDTO } from '../models/noticetermination.dto';
import { MeiraErrorDTO } from '../models/meiraerror.dto';

@Component({
  selector: 'app-notice-termination-save',
  templateUrl: './notice-termination-save.component.html',
  styleUrls: ['./notice-termination-save.component.css']
})
export class NoticeTerminationSaveComponent implements OnInit {

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
  private currentPage:number = 1;

  public fGNoticeTermination:FormGroup;
  private employId:string;
  private error:any;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder:FormBuilder, private modalService: NgbModal, 
    private apiDomainService:APIDomainService, private apiNoticeTerminationService:APINoticeTerminationService) {
    this.fGNoticeTermination = this.formBuilder.group({
      employeeId:[null, [Validators.required]],
      noticeReasonId:[null, [Validators.required]],
      noticeDate:[null, [Validators.required]],
      lastDay:[null, [Validators.required]],
      endDate:[null, [Validators.required]],      
      noticeStatus:[null, [Validators.required]],
      noticeTypeId:[null, [Validators.required]],
      cancelDate:[null, [Validators.required]],
      noticeTypeWorkedId:[null, [Validators.required]],
      cancelNoticeReasonId:[null, [Validators.required]]
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
      this.employId = params.get('employId');
    });
    if(this.employId !== null){
      this.apiNoticeTerminationService.getNoticeTermination(`terminationotices/employee/${this.employId}`).subscribe(
        (noticeTermination:NoticeTerminationDTO) => {
          this.noticeTerminationDTO = noticeTermination;
          if(this.noticeTerminationDTO !== null){
            this.getEmployees();
            this.fGNoticeTermination = this.formBuilder.group({
              employeeId:[this.noticeTerminationDTO.employee.id, [Validators.required]],
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
        },
        (error:any) => {
          this.error = error;
          console.log(this.error);
        }
      );
    }
  }

  private getEmployees():void{
    this.employees.push({
      id: this.noticeTerminationDTO.employee.id + '',
      name: this.noticeTerminationDTO.employee.name,
      value: ''
    });
  }
  
  public saveMessage(content):void{
    this.titleModal = 'Alerta';
    this.messageModal = `Deseja salvar o Aviso Prévio Trabalhado / Idenizado?`;
    this.actiomModal = 'Salvar';
    this.openAlert(content);
  }

  public save(){
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      
      this.noticeTerminationDTO.noticeReasonId = this.fGNoticeTermination.value['noticeReasonId'];
      this.noticeTerminationDTO.noticeDate = this.fGNoticeTermination.value['noticeDate'];
      this.noticeTerminationDTO.lastDay = this.fGNoticeTermination.value['lastDay'];
      this.noticeTerminationDTO.endDate = this.fGNoticeTermination.value['endDate'];     
      this.noticeTerminationDTO.noticeStatus = this.fGNoticeTermination.value['noticeStatus'];
      this.noticeTerminationDTO.noticeTypeId = this.fGNoticeTermination.value['noticeTypeId'];
      this.noticeTerminationDTO.cancelDate = this.fGNoticeTermination.value['cancelDate'];
      this.noticeTerminationDTO.noticeTypeWorkedId = this.fGNoticeTermination.value['noticeTypeWorkedId'];
      this.noticeTerminationDTO.cancelNoticeReasonId = this.fGNoticeTermination.value['cancelNoticeReasonId'];

      this.apiNoticeTerminationService.update(`terminationotices/${this.noticeTerminationDTO.id}`, this.noticeTerminationDTO).
      subscribe((data) => {
          this.status = 0;
          this.message = 'Aviso Prévio Trabalhado / Idenizado salvo com sucesso';
        },
          error => {
            this.status = 1;
            this.message = 'Erro ao tentar salvar o Prévio Trabalhado / Idenizado';
            console.log(error);
          }
        );
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
