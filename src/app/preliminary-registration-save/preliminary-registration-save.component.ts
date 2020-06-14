import { Component, OnInit } from '@angular/core';
import { PreliminaryRegistrationDTO } from '../models/preliminaryregistration.dto';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { APIPreliminaryRegistrationService } from '../services/apipreliminary-registration.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preliminary-registration-save',
  templateUrl: './preliminary-registration-save.component.html',
  styleUrls: ['./preliminary-registration-save.component.css']
})
export class PreliminaryRegistrationSaveComponent implements OnInit {

  public title:string = 'Cadastro Preliminar';
  private resource:string = 'preliminaryregistrations';
  
  public fGPreliminaryRegistration:FormGroup;
  private preliminaryRegistrationDTO:PreliminaryRegistrationDTO;

  modalOptions:NgbModalOptions;
  closeResult: string;
  
  titleModal:string = '';
  messageModal:string = '';
  actiomModal:string = '';

  public status:number = -1;
  public message:string = '';

  private error:any;

  
  constructor(private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private modalService: NgbModal,
    private apiPreliminaryRegistrationService:APIPreliminaryRegistrationService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.preliminaryRegistrationDTO = new PreliminaryRegistrationDTO();
      this.preliminaryRegistrationDTO.id = params.get('id');
      this.tofGPreliminaryRegistration();
    });
    if(this.preliminaryRegistrationDTO.id === "0"){
      this.actiomModal = 'Salvar';
    }else{
      this.apiPreliminaryRegistrationService.getPreliminaryRegistration(`${this.resource}/${this.preliminaryRegistrationDTO.id}`).
        subscribe((preliminaryRegistration:PreliminaryRegistrationDTO) => {
          if(preliminaryRegistration === null){
            this.status = 2;
            this.message = `Não existe o ${this.title} ${this.preliminaryRegistrationDTO.id}`;
            this.actiomModal = 'Salvar';
          }else{
            this.preliminaryRegistrationDTO = preliminaryRegistration;
            this.actiomModal = 'Atualizar';
            this.tofGPreliminaryRegistration();
          }
        }
      );
    }
  }

  private tofGPreliminaryRegistration():void{
    this.fGPreliminaryRegistration = this.formBuilder.group({
      name: new FormControl(this.preliminaryRegistrationDTO.name, [Validators.required]),
      gender: new FormControl(this.preliminaryRegistrationDTO.gender, [Validators.required]),
      documentId: new FormControl(this.preliminaryRegistrationDTO.documentId, [Validators.required]),
      dateBirth: new FormControl(this.preliminaryRegistrationDTO.dateBirth, [Validators.required]),
      admissionDate: new FormControl(this.preliminaryRegistrationDTO.admissionDate, [Validators.required])
    });
  }

  private toPreliminaryRegistration():void{
    this.preliminaryRegistrationDTO.name = this.fGPreliminaryRegistration.value['name'];
    this.preliminaryRegistrationDTO.gender = this.fGPreliminaryRegistration.value['gender'];
    this.preliminaryRegistrationDTO.documentId = this.fGPreliminaryRegistration.value['documentId'];
    this.preliminaryRegistrationDTO.dateBirth = this.fGPreliminaryRegistration.value['dateBirth'];
    this.preliminaryRegistrationDTO.admissionDate = this.fGPreliminaryRegistration.value['admissionDate'];
  }

  public saveMessage(content):void{
    if(this.fGPreliminaryRegistration.get('name').invalid || this.fGPreliminaryRegistration.get('documentId').invalid ||
      this.fGPreliminaryRegistration.get('gender').invalid || this.fGPreliminaryRegistration.get('dateBirth').invalid ||
      this.fGPreliminaryRegistration.get('admissionDate').invalid){
      this.status = 1;
    }else{
      this.titleModal = 'Alerta';
      if(this.preliminaryRegistrationDTO.id  === '0'){
        this.messageModal = `Deseja salvar ${this.title}?`;
        this.actiomModal = 'Salvar';
      }else{
        this.messageModal = `Deseja atualizar ${this.preliminaryRegistrationDTO.id} - ${this.preliminaryRegistrationDTO.name}?`;
        this.actiomModal = 'Atualizar';
      }
      this.openAlert(content);
    }
  }
  
  public save():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.toPreliminaryRegistration();
      if(this.preliminaryRegistrationDTO.id === '0'){
        this.apiPreliminaryRegistrationService.save(this.resource, this.preliminaryRegistrationDTO).
          subscribe((response) => {
            this.status = 0;
            this.actiomModal = 'Atualizar';
            this.preliminaryRegistrationDTO.id = this.getId(response.headers.get('location'));
            this.message = `${this.title} criado ${this.preliminaryRegistrationDTO.id} - ${this.preliminaryRegistrationDTO.name} com sucesso.`;
          },
          error => {
            this.status = 2;
            this.message = `Erro ao tentar criar o ${this.title} - ${this.preliminaryRegistrationDTO.name}`;
            this.error = error;
          }
        );
      }else{
        this.toPreliminaryRegistration();
        this.apiPreliminaryRegistrationService.update(`${this.resource}/${this.preliminaryRegistrationDTO.id}`, this.preliminaryRegistrationDTO).
          subscribe((response) => {
            this.status = 0;
            alert(JSON.stringify(this.preliminaryRegistrationDTO));
            this.message = `${this.title} atualizado ${this.preliminaryRegistrationDTO.id} - ${this.preliminaryRegistrationDTO.name} com sucesso.`;
            this.actiomModal = 'Atualizar';
          },
          error =>{
            this.error = error;
            this.status = 2;
            this.message = `Erro ao tentar atualizar o ${this.title} - ${this.preliminaryRegistrationDTO.name}`;
            console.log(this.error);
          });        
      }
    }    
  }

  public deleteMessage(content):void{
    this.apiPreliminaryRegistrationService.getPreliminaryRegistration(`${this.resource}/${this.preliminaryRegistrationDTO.id}`).
      subscribe((preliminaryRegistration:PreliminaryRegistrationDTO) => {
        if(preliminaryRegistration === null){
          this.messageModal = `Não existe o ${this.title} ${this.preliminaryRegistrationDTO.id} - ${this.preliminaryRegistrationDTO.name}`;
          this.actiomModal = 'Alert';
        }else{
          this.preliminaryRegistrationDTO = preliminaryRegistration;
          this.titleModal = 'Alerta';
          this.messageModal = `Deseja exluir ${this.title} ${this.preliminaryRegistrationDTO.id} - ${this.preliminaryRegistrationDTO.name}?`;
          this.actiomModal = 'Excluir';
        }
      }
    );
    this.openAlert(content);
  }

  public delete():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.apiPreliminaryRegistrationService.delete(`${this.resource}/${this.preliminaryRegistrationDTO.id}`).
        subscribe((response) => {
          this.status = 0;
          this.message = `${this.title} ${this.preliminaryRegistrationDTO.id} - ${this.preliminaryRegistrationDTO.name} excluído com sucesso.`;
          this.actiomModal = 'Salvar';
          this.preliminaryRegistrationDTO = new PreliminaryRegistrationDTO();
          this.tofGPreliminaryRegistration();
        },
        error => {
          this.status = 2;
          this.message = `Erro ao tentar excluir o ${this.title} ${this.preliminaryRegistrationDTO.id} - ${this.preliminaryRegistrationDTO.name}`;
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

  public fGPreliminaryRegistrationField(field:string):any{
    return this.fGPreliminaryRegistration.get(field);
  }

}
