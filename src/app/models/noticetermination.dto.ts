import { Employee } from './employee.dto';

export class NoticeTerminationDTO{
    id:number;
    noticeTypeId:number;
    noticeReasonId:number;
    noticeDate:Date;
    lastDay:Date;
    endDate:Date;
    noticeStatus:string;
    noticeTypeWorkedId:number;
    cancelDate:Date;
    cancelNoticeReasonId:number;
    export:string;
    employee:Employee
}