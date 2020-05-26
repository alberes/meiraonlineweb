import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NoticeTerminationComponent } from 'src/app/notice-termination/notice-termination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NoticeTerminationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminLayoutModule { }
