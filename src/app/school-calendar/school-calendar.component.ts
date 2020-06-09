import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterOutlet } from '@angular/router';
import { SchoolCalendarDTO } from '../models/schoolcalendar.dto';
import { APISchoolCalendarService } from '../services/apischool-calendar.service';
import { MessageDTO } from '../models/message.dto';

@Component({
  selector: 'app-school-calendar',
  templateUrl: './school-calendar.component.html',
  styleUrls: ['./school-calendar.component.css']
})
export class SchoolCalendarComponent implements OnInit {

  public title:string = 'Calendário Escolar';

  public fGFilterCompany:FormGroup;
  public schoolCalendars:SchoolCalendarDTO[];
  private schoolCalendarDTO:SchoolCalendarDTO;

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

  constructor(private router: Router, private formBuilder:FormBuilder, private modalService: NgbModal, private apiSchoolCalendarService:APISchoolCalendarService) {
    this.fGFilterCompany = this.formBuilder.
      group({
        exported: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {    
    this.schoolCalendarDTO = new SchoolCalendarDTO();
  }

  public filterCompany():void{
    this.currentPage = 1;
    if(this.fGFilterCompany.value['exported'] === 'N'){
      this.allowExport = true;
    }
    this.getSchoolCalendars();
  }

  private getSchoolCalendars() {
    if(this.currentPage === 0){
      this.currentPage = 1;
    }
    let resource:string = `schoolCalendars?page=${(this.currentPage - 1)}&linesPerPage=10&orderBy=id`;
    this.apiSchoolCalendarService.getSchoolCalendars(resource).
        subscribe(response => {
          this.schoolCalendars = response['content'];
          this.totalPages = response['totalPages'];
        },
          error => {
            this.error = error;
            console.log(this.error);
          }
        );
  }

  public first():void{
    this.currentPage = 1;
    this.getSchoolCalendars();
  }

  public rewind():void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.getSchoolCalendars();
    }
  }

  public forward():void{
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.getSchoolCalendars();
    }
  }

  public last():void{
    if(this.currentPage < this.totalPages){
      this.currentPage = this.totalPages;
      this.getSchoolCalendars();
    }
  }

  public export():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.apiSchoolCalendarService.export(`schoolCalendars/export/${this.schoolCalendarDTO.id}`).
      subscribe((response:MessageDTO) => {
        this.status = 0;
        if(response.status === 'OK'){
          this.message = `${this.title} exportado com sucesso.`;
        }else{
          this.status = 1;
          this.message = `Não foi encontrado ${this.title}.`;
        }
          this.getSchoolCalendars();
        },
        error => {
          this.status = 1;
          this.message = `Erro ao tentar exportar o ${this.title}.`;
          console.log(error);
        }
      )
    }
  }

  public exportMessage(id:string, name:string, content):void{
    this.schoolCalendarDTO.id = id;
    this.apiSchoolCalendarService.getSchoolCalendar(`schoolCalendars/${this.schoolCalendarDTO.id}.`).
      subscribe((sickleaves:any) => {
        let total:number = Number(sickleaves['totalElements']);
        if(total === 0){
          this.messageModal = `Não existe o ${this.title} o ${this.schoolCalendarDTO.id}.`;
          this.actiomModal = 'alert';
        }else{
          this.titleModal = 'Alerta';
          this.messageModal = `Deseja exportar o ${this.title} o ${this.schoolCalendarDTO.id}.?`;
          this.actiomModal = 'Exportar';
        }
      }
    );
    this.openAlert(content);
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
