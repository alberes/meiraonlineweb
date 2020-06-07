import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NoticeTerminationComponent } from '../../notice-termination/notice-termination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoticeTerminationSaveComponent } from '../../notice-termination-save/notice-termination-save.component';
import { SickLeaveComponent } from '../../sick-leave/sick-leave.component';
import { SickLeaveSaveComponent } from '../../sick-leave-save/sick-leave-save.component';

@NgModule({
  declarations: [
    NoticeTerminationComponent,
    NoticeTerminationSaveComponent,
    SickLeaveComponent,
    SickLeaveSaveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminLayoutModule { }
