import { Component, OnInit } from '@angular/core';
import { DomainDTO } from '../models/domain.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIDomainService } from '../services/apidomain.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notice-termination-save',
  templateUrl: './notice-termination-save.component.html',
  styleUrls: ['./notice-termination-save.component.css']
})
export class NoticeTerminationSaveComponent implements OnInit {

  public employees: DomainDTO[];
  typesNotices: DomainDTO[];
  reasonsNotices: DomainDTO[];
  typesNoticesWorked: DomainDTO[];
  reasonsCancelingNotice: DomainDTO[];

  public message:string = '';
  public status:number = -1;

  totalPages:number = 0;
  currentPage:number = 1;

  fGEmployee:FormGroup;

  error:any;
  
  constructor(private router: Router, private formBuilder:FormBuilder, private modalService: NgbModal, private apiDomainService:APIDomainService) {
    this.fGEmployee = this.formBuilder.group({
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
    this.getEmployees();
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
  }

  private getEmployees():void{
    let resource:string = '/employees/company/1?exported=N&page=' + (this.currentPage - 1);
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
  
  public save():void{
    this.message = 'Salvo com sucesso';
    this.status = 1;
  }

}
