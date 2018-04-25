import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';


import { Leader } from '../shared/leader';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

@Injectable()
export class LeaderService {

    //       //code for services using restangular
   
    constructor(private restangular: Restangular, private processHttpmsgService: ProcessHttpmsgService) { }

        //  constructor(private http: HttpClient, private processHttpmsgService: ProcessHttpmsgService) { }

    getLeaders(): Observable<Leader[]> {
        return this.restangular.all('leaders').getList();
    }

    getLeader(id: number): Observable<Leader> {
        return this.restangular.one('leaders', id).get();
        }

    getFeaturedLeader(): Observable<Leader> {
        return this.restangular.all('leaders').getList({ featured: true }).map(leaders => leaders[0]);
        }   
 
       //code for services using http 
/*   

    constructor(private http: Http, private processHttpmsgService: ProcessHttpmsgService) { }
   
       getLeaders(): Observable<Leader[]> {
        return this.http.get(baseURL + 'leaders')
        .map(res => { return this.processHttpmsgService.extractData(res); });
       }
   
       getLeader(id: number): Observable<Leader> {
        return  this.http.get(baseURL + 'leaders/'+ id)
        .map(res => { return this.processHttpmsgService.extractData(res); });
           }
   
       getFeaturedLeader(): Observable<Leader> {
        return this.http.get(baseURL + 'leaders?featured=true')
        .map(res => { return this.processHttpmsgService.extractData(res)[0]; }); }   
       
  */  
}