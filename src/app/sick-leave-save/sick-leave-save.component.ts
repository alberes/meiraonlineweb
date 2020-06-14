import { Component, OnInit } from '@angular/core';
import { DomainDTO } from '../models/domain.dto';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { APISickLeaveService } from '../services/apisick-leave.service';
import { APIEmployeeService } from '../services/apiemployee.service';
import { Employee } from '../models/employee.dto';
import { SickLeaveDTO } from '../models/sickleave.dto';

@Component({
  selector: 'app-sick-leave-save',
  templateUrl: './sick-leave-save.component.html',
  styleUrls: ['./sick-leave-save.component.css']
})
export class SickLeaveSaveComponent implements OnInit {

  public title:string = 'Afastamento Temporário';
  private resource:string = 'sickleaves';

  public employees: Array<DomainDTO> = [];
  public fGSickLeave:FormGroup;
  private sickLeaveDTO:SickLeaveDTO;
  public sickLeaves:SickLeaveDTO[];
  private employeeDTO:Employee;
  private error:any;

  modalOptions:NgbModalOptions;
  closeResult: string;

  titleModal:string = '';
  messageModal:string = '';
  actiomModal:string = '';

  public status:number = -1;
  public message:string = '';

  public totalPages:number = 0;
  public currentPage:number = 0;
  
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private modalService:NgbModal, 
    private apiSickLeaveService:APISickLeaveService, private apiEmployeeService:APIEmployeeService) {
      this.fGSickLeave = this.formBuilder.group({
        employeeId: new FormControl({value: null, disabled: true}, Validators.required),
        sickNumber: new FormControl(null, Validators.required),
        reasonSickLeave: new FormControl(null, Validators.required),
        startDate: new FormControl(null, Validators.required),
        quantity: new FormControl(0, Validators.required),
        endDate: new FormControl(null, Validators.required),
        noticeStatus: new FormControl(null, Validators.required),
        trafficAccidentType: new FormControl(null, Validators.required),
        detailSickLeave : new FormControl(null, Validators.required),
        cid: new FormControl(null, Validators.required),
        descriptionCID: new FormControl({value: null, disabled: true}),
        doctorName: new FormControl(null, Validators.required),
        organClass: new FormControl(null, Validators.required),
        classOrganRegistration: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        rectification: new FormControl(null, Validators.required),
        rectificationOrigin: new FormControl(null, Validators.required),
        processType: new FormControl(null, Validators.required),
        processNumber: new FormControl(null, Validators.required),
        responsibleCompensation: new FormControl(null, Validators.required),
        laborUnion: new FormControl(null, Validators.required),
        documentNumber: new FormControl({value: null, disabled: true}),
      });
    }

  ngOnInit(): void {
    this.messageModal = `Deseja salvar o ${this.title}?`;
    this.actiomModal = 'listar';
    this.activatedRoute.paramMap.subscribe(params => {
      this.employeeDTO = new Employee();
      this.employeeDTO.id = params.get('employeeId');
    });
    if(this.employeeDTO.id !== null){
      this.apiEmployeeService.getEmployee(`employees/${this.employeeDTO.id}`).
        subscribe((employee:Employee) => {
          this.employeeDTO = employee;
          this.fillEmployees();
          this.tofGSickLeave();
        },
        (error:any) => {
          this.error = error;
          console.log(this.error);
        }
      );
      this.getSickLeaves();
      this.sickLeaveDTO = new SickLeaveDTO();
      this.tofGSickLeave();
    }else{
      console.log('Not found employeeId');
    }
  }

  private fillEmployees():void{ 
      this.employees.push({
        id: this.employeeDTO.id,
        name: this.employeeDTO.name,
        value: ''
      });
  }

  private tofGSickLeave():void{
    this.fGSickLeave = this.formBuilder.group({
      employeeId: new FormControl({value: this.employeeDTO.id, disabled: true}, Validators.required),
      sickNumber: [this.sickLeaveDTO.sickNumber, [Validators.required]],
      reasonSickLeave: [this.sickLeaveDTO.reasonSickLeave, [Validators.required]],
      startDate: [this.sickLeaveDTO.startDate, [Validators.required]],
      quantity: [this.sickLeaveDTO.quantity, [Validators.required]],
      endDate: [this.sickLeaveDTO.endDate, [Validators.required]],
      noticeStatus: [this.sickLeaveDTO.noticeStatus, [Validators.required]],
      trafficAccidentType: [this.sickLeaveDTO.trafficAccidentType, [Validators.required]],
      detailSickLeave : [this.sickLeaveDTO.detailSickLeave, [Validators.required]],
      cid: [this.sickLeaveDTO.cid, [Validators.required]],
      descriptionCID: new FormControl({value: null, disabled: true}),
      doctorName: [this.sickLeaveDTO.doctorName, [Validators.required]],
      organClass: [this.sickLeaveDTO.organClass, [Validators.required]],
      classOrganRegistration: [this.sickLeaveDTO.classOrganRegistration, [Validators.required]],
      state: [this.sickLeaveDTO.state, [Validators.required]],
      rectification: [this.sickLeaveDTO.rectification, [Validators.required]],
      rectificationOrigin: [this.sickLeaveDTO.rectificationOrigin, [Validators.required]],
      processType: [this.sickLeaveDTO.processType, [Validators.required]],
      processNumber: [this.sickLeaveDTO.processNumber, [Validators.required]],
      responsibleCompensation: [this.sickLeaveDTO.responsibleCompensation, [Validators.required]],
      laborUnion: [this.sickLeaveDTO.laborUnion, [Validators.required]],
      documentNumber: new FormControl({value: null, disabled: true}),
    });
  }

  private toSickLeave():void{
    this.sickLeaveDTO.sickNumber = this.fGSickLeave.value['sickNumber'];
    this.sickLeaveDTO.reasonSickLeave = this.fGSickLeave.value['reasonSickLeave'];
    this.sickLeaveDTO.startDate = this.fGSickLeave.value['startDate'];
    this.sickLeaveDTO.quantity = this.fGSickLeave.value['quantity'];
    this.sickLeaveDTO.endDate = this.fGSickLeave.value['endDate'];
    this.sickLeaveDTO.noticeStatus = this.fGSickLeave.value['noticeStatus'];
    this.sickLeaveDTO.trafficAccidentType = this.fGSickLeave.value['trafficAccidentType'];
    this.sickLeaveDTO.detailSickLeave = this.fGSickLeave.value['detailSickLeave'];
    this.sickLeaveDTO.cid = this.fGSickLeave.value['cid'];
    this.sickLeaveDTO.descriptionCID = this.fGSickLeave.value['descriptionCID'];
    this.sickLeaveDTO.doctorName = this.fGSickLeave.value['doctorName'];
    this.sickLeaveDTO.organClass = this.fGSickLeave.value['organClass'];
    this.sickLeaveDTO.classOrganRegistration = this.fGSickLeave.value['classOrganRegistration'];
    this.sickLeaveDTO.state = this.fGSickLeave.value['state'];
    this.sickLeaveDTO.rectification = this.fGSickLeave.value['rectification'];
    this.sickLeaveDTO.rectificationOrigin = this.fGSickLeave.value['rectificationOrigin'];
    this.sickLeaveDTO.processType = this.fGSickLeave.value['processType'];
    this.sickLeaveDTO.processNumber = this.fGSickLeave.value['processNumber'];
    this.sickLeaveDTO.responsibleCompensation = this.fGSickLeave.value['responsibleCompensation'];
    this.sickLeaveDTO.laborUnion = this.fGSickLeave.value['laborUnion'];
    this.sickLeaveDTO.employee = this.employeeDTO;
  }

  public addSickLeave():void{
    this.actiomModal = 'Salvar';
    this.sickLeaveDTO = new SickLeaveDTO();
  }

  public saveMessage(content):void{
    if(this.fGSickLeave.get('sickNumber').invalid || this.fGSickLeave.get('reasonSickLeave').invalid ||
      this.fGSickLeave.get('startDate').invalid || this.fGSickLeave.get('quantity').invalid ||
      this.fGSickLeave.get('endDate').invalid || this.fGSickLeave.get('noticeStatus').invalid ||
      this.fGSickLeave.get('trafficAccidentType').invalid || this.fGSickLeave.get('detailSickLeave').invalid ||  
      this.fGSickLeave.get('cid').invalid || this.fGSickLeave.get('doctorName').invalid ||
      this.fGSickLeave.get('organClass').invalid || this.fGSickLeave.get('classOrganRegistration').invalid ||
      this.fGSickLeave.get('state').invalid || this.fGSickLeave.get('rectification').invalid ||
      this.fGSickLeave.get('rectificationOrigin').invalid || this.fGSickLeave.get('processType').invalid ||
      this.fGSickLeave.get('processNumber').invalid || this.fGSickLeave.get('responsibleCompensation').invalid ||
      this.fGSickLeave.get('laborUnion').invalid){
      this.status = 1;
    }else{
      this.titleModal = 'Alerta';    
      this.openAlert(content);
    }
  }
  
  public save():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();      
      this.toSickLeave();
      if(this.actiomModal === 'Atualizar'){
        this.apiSickLeaveService.update(`${this.resource}/${this.sickLeaveDTO.id}`, this.sickLeaveDTO).
        subscribe((response) => {
          this.status = 0;
          this.message = `${this.title} atualizado ${this.sickLeaveDTO.id} - ${this.sickLeaveDTO.sickNumber} com sucesso.`;
          this.actiomModal = 'listar';
          this.getSickLeaves();
        },
          error => {
            this.error = error;
            this.status = 2;
            this.message = `Erro ao tentar atualizar o ${this.title}.`;
            console.log(error);
          }
        );
      }else{
        this.sickLeaveDTO.export = 'N';
        this.apiSickLeaveService.save(this.resource, this.sickLeaveDTO).
        subscribe(response => {
          this.status = 0;
          this.sickLeaveDTO.id = this.getId(response.headers.get('location'));
          this.message = `${this.title} criado ${this.sickLeaveDTO.id} - ${this.sickLeaveDTO.sickNumber} com sucesso.`;
          this.actiomModal = 'listar';
          this.getSickLeaves();
        },
        (error:any) => {
          this.status = 2;
          this.message = `Erro ao tentar criar o ${this.title}.`;
          this.error = error;
          console.log(this.error);
        }
        );
      }
    }
  }

  private getId(location:string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

  private getSickLeaves() {
    if(this.currentPage === 0){
      this.currentPage = 1;
    }
    let resource:string = `${this.resource}/employee/${this.employeeDTO.id}?page=${(this.currentPage - 1)}&linesPerPage=10&orderBy=id`;
    this.apiSickLeaveService.getSickLeaveByEmployee(resource).
        subscribe(response => {
          this.sickLeaves = response['content'];
          this.totalPages = response['totalPages'];
        },
          error => {
            this.error = error;
            console.log(this.error);
          }
        );
  }

  public edit(id:string):void{
    this.sickLeaves.forEach(s => {
      if(s.id === id){
        this.sickLeaveDTO = s;
        this.tofGSickLeave();
        this.actiomModal = 'Atualizar';
      }
    });
  }

  public deleteMessage(id:string, sickNumber:string, content):void{
    this.status = -1;
    this.apiSickLeaveService.getSickLeave(`${this.resource}/${id}`).
      subscribe((sickleave:SickLeaveDTO) => {
        if(sickleave === null){
          this.messageModal = `Não existe o ${this.title} ${id} - ${sickNumber}`;
          this.actiomModal = 'Alert';
        }else{
          this.sickLeaveDTO = sickleave;
          this.titleModal = 'Alerta';
          this.messageModal = `Deseja exluir ${this.title} ${this.sickLeaveDTO.id} - ${this.sickLeaveDTO.sickNumber}?`;
          this.actiomModal = 'Excluir';
        }
      }
    );
    this.openAlert(content);
  }

  public delete():void{
    if(this.modalService.hasOpenModals){
      this.modalService.dismissAll();
      this.apiSickLeaveService.delete(`${this.resource}/${this.sickLeaveDTO.id}`).
        subscribe((response) => {
          this.status = 0;
          this.message = `${this.title} ${this.sickLeaveDTO.id} - ${this.sickLeaveDTO.sickNumber} excluído com sucesso.`; 
          this.actiomModal = 'listar';
          this.getSickLeaves();
        },
        error => {
          this.status = 2;
          this.message = `Erro ao tentar excluir o ${this.title} ${this.sickLeaveDTO.id} - ${this.sickLeaveDTO.sickNumber}`;
          console.log(error);
        }
      );      
    }
  }

  public listSickLeave():void{
    this.actiomModal = 'listar';
  }

  public first():void{
    this.currentPage = 1;
    this.getSickLeaves();
  }

  public rewind():void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.getSickLeaves();
    }
  }

  public forward():void{
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.getSickLeaves();
    }
  }

  public last():void{
    if(this.currentPage < this.totalPages){
      this.currentPage = this.totalPages;
      this.getSickLeaves();
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

  public fGSickLeaveField(field:string):any{
    return this.fGSickLeave.get(field);
  }
  
}
