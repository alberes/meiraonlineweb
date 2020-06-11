import { Component, OnInit } from '@angular/core';
import { APISchoolCalendarService } from '../services/apischool-calendar.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SchoolCalendarDTO } from '../models/schoolcalendar.dto';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-school-calendar-save',
  templateUrl: './school-calendar-save.component.html',
  styleUrls: ['./school-calendar-save.component.css']
})
export class SchoolCalendarSaveComponent implements OnInit {

  public title:string = 'Calendário Escolar';

  public fGSchoolCalendar:FormGroup;
  private schoolCalendarDTO:SchoolCalendarDTO;

  modalOptions:NgbModalOptions;
  closeResult: string;
  
  titleModal:string = '';
  messageModal:string = '';
  actiomModal:string = '';

  public status:number = -1;
  public message:string = '';

  private error:any;

  constructor(private activatedRoute:ActivatedRoute, private apiSchoolCalendarService:APISchoolCalendarService, private formBuilder:FormBuilder,
    private modalService:NgbModal) {
  }

  ngOnInit(): void {
    this.actiomModal = 'Salvar';
    this.activatedRoute.paramMap.subscribe(params => {
      this.schoolCalendarDTO = new SchoolCalendarDTO();
      this.schoolCalendarDTO.id = params.get('id');
      this.tofGSchoolCalendar();
    });
    if(this.schoolCalendarDTO.id === "0"){
      this.actiomModal = 'Salvar';
    }else{
      this.apiSchoolCalendarService.getSchoolCalendar(`schoolCalendars/${this.schoolCalendarDTO.id}`).
        subscribe((schoolCalendar:SchoolCalendarDTO) => {
          if(schoolCalendar === null){
            this.status = 2;
            this.message = `Não existe o ${this.title} ${this.schoolCalendarDTO.id}`;
            this.actiomModal = 'Salvar';
          }else{
            this.schoolCalendarDTO = schoolCalendar;
            this.actiomModal = 'Atualizar';
            this.tofGSchoolCalendar();
          }
        }
      );
    }
  }

  private tofGSchoolCalendar():void{
    this.fGSchoolCalendar = this.formBuilder.group({
      name: new FormControl(this.schoolCalendarDTO.name, [Validators.required]),
      yearReference: new FormControl(this.schoolCalendarDTO.yearReference, [Validators.required]),
      startDateSchoolYear: new FormControl(this.schoolCalendarDTO.startDateSchoolYear, [Validators.required]),
      endDateSchoolYear: new FormControl(this.schoolCalendarDTO.endDateSchoolYear, [Validators.required]),
      startDateFirstHalf: new FormControl(this.schoolCalendarDTO.startDateFirstHalf, [Validators.required]),
      endDateFirstHalf: new FormControl(this.schoolCalendarDTO.endDateFirstHalf, [Validators.required]),
      startDateFirstHalfVacation: new FormControl(this.schoolCalendarDTO.startDateFirstHalfVacation, [Validators.required]),
      endDateFirstHalfVacation: new FormControl(this.schoolCalendarDTO.endDateFirstHalfVacation, [Validators.required]),
      startDateSecondHalf: new FormControl(this.schoolCalendarDTO.startDateSecondHalf, [Validators.required]),
      endDateSecondHalf: new FormControl(this.schoolCalendarDTO.endDateSecondHalf, [Validators.required]),
      startDateSecondHalfVacation: new FormControl(this.schoolCalendarDTO.startDateSecondHalfVacation, [Validators.required]),
      endDateSecondHalfVacation: new FormControl(this.schoolCalendarDTO.endDateSecondHalfVacation, [Validators.required]),
      startDateFirstHalfRecess: new FormControl(this.schoolCalendarDTO.startDateFirstHalfRecess, [Validators.required]),
      endDateFirstHalfRecess: new FormControl(this.schoolCalendarDTO.endDateFirstHalfRecess, [Validators.required]),
      startDateSecondHalfRecess: new FormControl(this.schoolCalendarDTO.startDateSecondHalfRecess, [Validators.required]),
      endDateSecondHalfRecess: new FormControl(this.schoolCalendarDTO.endDateSecondHalfRecess, [Validators.required])
    });
  }

  private toSchoolCalendar():void{
    this.schoolCalendarDTO.name = this.fGSchoolCalendar.value['name'];
    this.schoolCalendarDTO.yearReference = this.fGSchoolCalendar.value['yearReference'];
    this.schoolCalendarDTO.startDateSchoolYear = this.fGSchoolCalendar.value['startDateSchoolYear'];
    this.schoolCalendarDTO.endDateSchoolYear = this.fGSchoolCalendar.value['endDateSchoolYear'];
    this.schoolCalendarDTO.startDateFirstHalf = this.fGSchoolCalendar.value['startDateFirstHalf'];
    this.schoolCalendarDTO.endDateFirstHalf = this.fGSchoolCalendar.value['endDateFirstHalf'];
    this.schoolCalendarDTO.startDateFirstHalfVacation = this.fGSchoolCalendar.value['startDateFirstHalfVacation'];
    this.schoolCalendarDTO.endDateFirstHalfVacation = this.fGSchoolCalendar.value['endDateFirstHalfVacation'];
    this.schoolCalendarDTO.startDateSecondHalf = this.fGSchoolCalendar.value['startDateSecondHalf'];
    this.schoolCalendarDTO.endDateSecondHalf = this.fGSchoolCalendar.value['endDateSecondHalf'];
    this.schoolCalendarDTO.startDateSecondHalfVacation = this.fGSchoolCalendar.value['startDateSecondHalfVacation'];
    this.schoolCalendarDTO.endDateSecondHalfVacation = this.fGSchoolCalendar.value['endDateSecondHalfVacation'];
    this.schoolCalendarDTO.startDateFirstHalfRecess = this.fGSchoolCalendar.value['startDateFirstHalfRecess'];
    this.schoolCalendarDTO.endDateFirstHalfRecess = this.fGSchoolCalendar.value['endDateFirstHalfRecess'];
    this.schoolCalendarDTO.startDateSecondHalfRecess = this.fGSchoolCalendar.value['startDateSecondHalfRecess'];
    this.schoolCalendarDTO.endDateSecondHalfRecess = this.fGSchoolCalendar.value['endDateSecondHalfRecess'];
  }

  public saveMessage(content):void{
    if(this.fGSchoolCalendar.get('name').invalid || this.fGSchoolCalendar.get('yearReference').invalid ||
      this.fGSchoolCalendar.get('startDateSchoolYear').invalid || this.fGSchoolCalendar.get('endDateSchoolYear').invalid ||
      this.fGSchoolCalendar.get('startDateFirstHalf').invalid || this.fGSchoolCalendar.get('endDateFirstHalf').invalid ||
      this.fGSchoolCalendar.get('startDateFirstHalfVacation').invalid || this.fGSchoolCalendar.get('endDateFirstHalfVacation').invalid ||
      this.fGSchoolCalendar.get('startDateSecondHalf').invalid || this.fGSchoolCalendar.get('endDateSecondHalf').invalid ||
      this.fGSchoolCalendar.get('startDateSecondHalfVacation').invalid || this.fGSchoolCalendar.get('endDateSecondHalfVacation').invalid ||
      this.fGSchoolCalendar.get('startDateFirstHalfRecess').invalid || this.fGSchoolCalendar.get('endDateFirstHalfRecess').invalid ||
      this.fGSchoolCalendar.get('startDateSecondHalfRecess').invalid ||this.fGSchoolCalendar.get('endDateSecondHalfRecess').invalid){
      this.status = 1;
    }else{
      this.titleModal = 'Alerta';
      if(this.schoolCalendarDTO.id  === '0'){
        this.messageModal = `Deseja salvar ${this.title}?`;
        this.actiomModal = 'Salvar';
      }else{
        this.messageModal = `Deseja atualizar ${this.schoolCalendarDTO.id} - ${this.schoolCalendarDTO.name}?`;
        this.actiomModal = 'Atualizar';
      }
      this.openAlert(content);
    }
  }
  
  public save():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.toSchoolCalendar();
      if(this.schoolCalendarDTO.id === '0'){
        this.apiSchoolCalendarService.save(`schoolCalendars`, this.schoolCalendarDTO).
          subscribe((response) => {
            this.status = 0;
            this.actiomModal = 'Atualizar';
            this.schoolCalendarDTO.id = this.getId(response.headers.get('location'));
            this.message = `${this.title} criado ${this.schoolCalendarDTO.id} - ${this.schoolCalendarDTO.name} com sucesso.`;
          },
          error => {
            this.status = 2;
            this.message = `Erro ao tentar criar o ${this.title} - ${this.schoolCalendarDTO.name}`;
            this.error = error;
          }
        );
      }else{
        this.toSchoolCalendar();
        this.apiSchoolCalendarService.update(`schoolCalendars/${this.schoolCalendarDTO.id}`, this.schoolCalendarDTO).
          subscribe((response) => {
            this.status = 0;
            this.message = `${this.title} atualizado ${this.schoolCalendarDTO.id} - ${this.schoolCalendarDTO.name} com sucesso.`;
            this.actiomModal = 'Atualizar';
          },
          error =>{
            this.error = error;
            this.status = 2;
            this.message = `Erro ao tentar atualizar o ${this.title} - ${this.schoolCalendarDTO.name}`;
            console.log(this.error);
          });        
      }
    }    
  }

  public deleteMessage(content):void{
    this.apiSchoolCalendarService.getSchoolCalendar(`schoolCalendars/${this.schoolCalendarDTO.id}`).
      subscribe((schoolCalendar:SchoolCalendarDTO) => {
        if(schoolCalendar === null){
          this.messageModal = `Não existe o ${this.title} ${this.schoolCalendarDTO.id} - ${this.schoolCalendarDTO.name}`;
          this.actiomModal = 'Alert';
        }else{
          this.schoolCalendarDTO = schoolCalendar;
          this.titleModal = 'Alerta';
          this.messageModal = `Deseja exluir ${this.title} ${this.schoolCalendarDTO.id} - ${this.schoolCalendarDTO.name}?`;
          this.actiomModal = 'Excluir';
        }
      }
    );
    this.openAlert(content);
  }

  public delete():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.apiSchoolCalendarService.delete(`schoolCalendars/${this.schoolCalendarDTO.id}`).
        subscribe((response) => {
          this.status = 0;
          this.message = `${this.title} ${this.schoolCalendarDTO.id} - ${this.schoolCalendarDTO.name} excluído com sucesso.`;
          this.actiomModal = 'Salvar';
          this.schoolCalendarDTO = new SchoolCalendarDTO();
          this.tofGSchoolCalendar();
        },
        error => {
          this.status = 2;
          this.message = `Erro ao tentar excluir o ${this.title} ${this.schoolCalendarDTO.id} - ${this.schoolCalendarDTO.name}`;
          console.log(error);
        });
    }
  }

  private getId(location:string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
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

  public fGSchoolCalendarField(field:string):any{
    return this.fGSchoolCalendar.get(field);
  }

}
