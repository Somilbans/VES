import { Injectable } from '@angular/core';

import { Visitor } from '../shared/visitor';
import { Observable } from 'rxjs/Observable';

import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/catch';

import { RestangularModule, Restangular } from 'ngx-restangular';


@Injectable()
export class VisitorService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHttpmsgService) { }
    
    submitVisitors(visitor: Visitor): Observable<Visitor> {
      if (visitor) {
        return this.restangular.all('visitor').post(visitor);
      }
    }

    
    getVisitors(): Observable<Visitor[]> {
                      return this.restangular.all('visitor').getList();

    }
  
    getVisitorId(id: number): Observable<Visitor> {
      return  this.restangular.one('visitor',id).get();
       }
  
   
  
    getVisitorsIds(): Observable<number[]> {
     
     
      return this.getVisitors()
        .map(visitors => { return visitors.map(visitor => visitor.id) });
//        .catch(error => { return error; } );

    }

    getVisitorMobileNo(mobile: number): Observable<Visitor> {
      return  this.restangular.one('visitor',mobile).get();
       }
 
  
    getVisitorsMobileNos(): Observable<number[]> {
     
     
      return this.getVisitors()
        .map(visitors => { return visitors.map(visitor => visitor.mobilenum) });
//        .catch(error => { return error; } );

    }

    getM(mobile: number): Observable<Visitor> {
      return this.restangular.all('visitor').getList({ mobilenum: mobile }).map(visitor => visitor[visitor.length-1]);
      }   


     

}
