import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NoticeTerminationComponent } from './notice-termination/notice-termination.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { NoticeTerminationSaveComponent } from './notice-termination-save/notice-termination-save.component';
import { SickLeaveComponent } from './sick-leave/sick-leave.component';
import { SickLeaveSaveComponent } from './sick-leave-save/sick-leave-save.component';
import { SchoolCalendarComponent } from './school-calendar/school-calendar.component';
import { SchoolCalendarSaveComponent } from './school-calendar-save/school-calendar-save.component';
import { PreliminaryRegistrationComponent } from './preliminary-registration/preliminary-registration.component';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'notice-termination',
        component: NoticeTerminationComponent
      },
      {
        path: 'notice-termination-save/:employeeId',
        component: NoticeTerminationSaveComponent
      },
      {
        path: 'sick-leave',
        component: SickLeaveComponent
      },
      {
        path: 'sick-leave-save/:employeeId',
        component: SickLeaveSaveComponent
      },
      {
        path: 'school-calendar',
        component: SchoolCalendarComponent
      },
      {
        path: 'school-calendar-save/:id',
        component: SchoolCalendarSaveComponent
      },
      {
        path: 'preliminary-registration',
        component: PreliminaryRegistrationComponent
      }
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
