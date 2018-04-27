import { Injectable } from '@angular/core';

import { Visitor } from '../shared/visitor';
import { Observable } from 'rxjs/Observable';
import {Contact} from '../shared/contact';

import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/catch';

import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class VisitorService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHttpmsgService) { }
    
    // function for submitting visitors data {mobileno}
    submitVisitors(visitor: Visitor): Observable<Visitor> {
      if (visitor) {
     
        return this.restangular.all('visitors').post(visitor);
      }
    }

    //// function for submitting visitors data {contact}
    submitVisitorscontactPersons(contact:Contact,visitor: Visitor): Observable<Visitor> {
      if (visitor) {
        return this.restangular.all('visitors/'+visitor.mobilenum+'/contactPersons').post(contact);
      }
    }

    //function for get all visitor data
    getVisitors(): Observable<Visitor[]> {
                      return this.restangular.all('visitors').getList();
    }
  
    getVisitorId(id: number): Observable<Visitor> {
      return  this.restangular.one('visitors',id).get();
       }
  
     getVisitorsIds(): Observable<number[]> {
       return this.getVisitors()
        .map(visitors => { return visitors.map(visitor => visitor.id) });
//        .catch(error => { return error; } );
    }

    getVisitorMobileNo(mobile: number): Observable<Visitor> {
      
      return  this.restangular.one('visitors',mobile).get();
       }
 
    getVisitorsMobileNos(): Observable<number[]> {
        return this.getVisitors()
        .map(visitors => { return visitors.map(visitor => visitor.mobilenum) });
//        .catch(error => { return error; } );

    }

    checkVisitor(mobile: number): Observable<Visitor> {
      
      return  this.restangular.one('visitors',mobile).get();
      }   

    updateVisitorName(mobile:number, name:string) {
      var elem=this.restangular.one('visitors',mobile);
      elem.name=name;
      elem.put();
          }   
    getM(mobile: number): Observable<Visitor> {
      return this.restangular.all('visitors').getList({ mobilenum: mobile }).map(visitor => visitor[visitor.length-1]);
      }   
}
