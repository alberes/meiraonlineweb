import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIDomainService } from './services/apidomain.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APINoticeTerminationService } from './services/apinotice-termination.service';
import { HttpErrorMeiraInterceptor } from './services/exception/http-error.interceptor';
import { SickLeaveSaveComponent } from './sick-leave-save/sick-leave-save.component';

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
    APIDomainService,
    APINoticeTerminationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorMeiraInterceptor,
      multi: true  
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
