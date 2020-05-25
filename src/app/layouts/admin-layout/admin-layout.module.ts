import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NoticeTerminationComponent } from 'src/app/notice-termination/notice-termination.component';

@NgModule({
  declarations: [
    NoticeTerminationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes)
  ]
})
export class AdminLayoutModule { }
