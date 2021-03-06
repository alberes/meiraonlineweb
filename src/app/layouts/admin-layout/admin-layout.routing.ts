import { Routes } from '@angular/router';

import { NoticeTerminationComponent } from '../../notice-termination/notice-termination.component'; 
import { NoticeTerminationSaveComponent } from '../../notice-termination-save/notice-termination-save.component';
import { SickLeaveComponent } from '../../sick-leave/sick-leave.component';
import { SickLeaveSaveComponent } from '../../sick-leave-save/sick-leave-save.component';
import { SchoolCalendarComponent } from '../../school-calendar/school-calendar.component';
import { SchoolCalendarSaveComponent } from '../../school-calendar-save/school-calendar-save.component';
import { PreliminaryRegistrationComponent } from '../../preliminary-registration/preliminary-registration.component';
import { PreliminaryRegistrationSaveComponent } from '../../preliminary-registration-save/preliminary-registration-save.component';
import { EmployerUnionContributionComponent } from '../../employer-union-contribution/employer-union-contribution.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'notice-termination', component: NoticeTerminationComponent},
    { path: 'notice-termination-save/:employeeId', component: NoticeTerminationSaveComponent},
    { path: 'sick-leave', component: SickLeaveComponent},
    { path: 'sick-leave-save/:employeeId', component: SickLeaveSaveComponent},
    { path: 'school-calendar', component: SchoolCalendarComponent},
    { path: 'school-calendar-save/:id', component: SchoolCalendarSaveComponent},
    { path: 'preliminary-registration', component: PreliminaryRegistrationComponent},
    { path: 'preliminary-registration-save/:id', component: PreliminaryRegistrationSaveComponent},
    { path: 'employer-union-contribution', component: EmployerUnionContributionComponent}
];