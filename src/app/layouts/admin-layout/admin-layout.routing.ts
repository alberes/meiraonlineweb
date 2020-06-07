import { Routes } from '@angular/router';

import { NoticeTerminationComponent } from '../../notice-termination/notice-termination.component'; 
import { NoticeTerminationSaveComponent } from '../../notice-termination-save/notice-termination-save.component';
import { SickLeaveComponent } from 'src/app/sick-leave/sick-leave.component';
import { SickLeaveSaveComponent } from 'src/app/sick-leave-save/sick-leave-save.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'notice-termination', component: NoticeTerminationComponent},
    { path: 'notice-termination-save/:employeeId', component: NoticeTerminationSaveComponent},
    { path: 'sick-leave', component: SickLeaveComponent},
    { path: 'sick-leave-save/:employeeId', component: SickLeaveSaveComponent}
];