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
