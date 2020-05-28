import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { APIDomainService } from './services/apidomain.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoticeTerminationSaveComponent } from './notice-termination-save/notice-termination-save.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    HttpClient,
    APIDomainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
