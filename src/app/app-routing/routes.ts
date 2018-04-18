import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import {ContactComponent} from  '../contact/contact.component';
import {ThankyouComponent} from  '../thankyou/thankyou.component';
import {HeaderComponent} from '../header/header.component'; 

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
   { path: 'home/:mobilenum', component: ContactComponent },
  //{ path: '/contact', component: ContactComponent },
     
  { path: 'thankyou', component: ThankyouComponent },
    { path: 'header', component: HeaderComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];  