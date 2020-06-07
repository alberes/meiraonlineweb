import { Employee } from './employee.dto';

export class SickLeaveDTO{
    id:string;
    sickNumber:string;
    reasonSickLeave:string;
    startDate:Date;
    quantity:number;
    endDate:Date;
    noticeStatus:string;
    trafficAccidentType:string;
    detailSickLeave  :string;
    cid:string;
    descriptionCID:string;
    doctorName:string;
    organClass:string;
    classOrganRegistration:string;
    state:string;
    rectification:string;
    rectificationOrigin:string;
    processType:string;
    processNumber:string;
    responsibleCompensation:string;
    laborUnion:string;
    documentNumber:string;
    export:string;
    employee:Employee
}