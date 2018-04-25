import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';
 
import { HttpModule } from '@angular/http';


import 'hammerjs';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { HeaderComponent } from './header/header.component';


import { VisitorService } from './services/visitor.service';
import { LeaderService } from './services/leader.service';


import { baseURL } from './shared/baseurl';
import {ProcessHttpmsgService} from './services/process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    ThankyouComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [ VisitorService,LeaderService,{provide: 'BaseURL', useValue: baseURL},ProcessHttpmsgService],
  entryComponents: [

  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
  