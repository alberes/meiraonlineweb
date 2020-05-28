import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NoticeTerminationComponent } from './notice-termination/notice-termination.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { NoticeTerminationSaveComponent } from './notice-termination-save/notice-termination-save.component';


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
        path: 'notice-termination-save',
        component: NoticeTerminationSaveComponent
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
