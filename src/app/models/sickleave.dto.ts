import { Employee } from './employee.dto';

export class SickLeaveDTO{
    id:string;
    sickNumber:string;
    reason:string;
    startDate:Date;
    endDate:Date;
    quantity:number;
    doctorName:string;
    organ:string;
    institution:string;
    export:string;
    employee:Employee
}