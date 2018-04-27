import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';

import {Visitor} from '../shared/visitor';
import {Leader} from '../shared/leader';
 
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { VisitorService } from '../services/visitor.service';
import {LeaderService} from '../services/leader.service';
import { Response } from '@angular/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  
  leader:Leader;
  leaderErrMess: string;

  visitorForm: FormGroup;
  visitor:Visitor;
  visitorcopy: Visitor;
  visitorcheck:Visitor;
  visit:Visitor;
  mobilenumber: number;
  submitted = false;

  statuscode: any;
  formErrors = {
        'mobilenum': ''
  };

  validationMessages = {
    'mobilenum': {
      'required':      'Mobile Number is required.',
      'minlength':     'MobileNumber cannot be less than 10 digits.',
      'pattern':       'Mobile number must contain only numbers.'
    }, 
  };

  constructor(private visitorService: VisitorService, private leaderService: LeaderService, private route: ActivatedRoute,private fb: FormBuilder, @Inject('BaseURL') private BaseURL) {
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader =leader, errmess => this.leaderErrMess = <any>errmess);
    this.createForm();
  }

  ngOnInit() {
   /* this.route.params.switchMap((params: Params) => { return this.visitorService.getVisitorMobileNo(+params['id']);})
    .subscribe(visit => {this.visit = visit; });
 */
  }

  createForm() {
    this.visitorForm = this.fb.group({
        mobilenum: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern] ],
        name: ['']
    });
    this.visitorForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  } 

  onValueChanged(data?: any) {
      if (!this.visitorForm) { return; }
      const form = this.visitorForm;
      for (const field in this.formErrors) {
        // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
      } 
  }


  /**
   * reset form values and hide other intermediate divs
   * using observable timer
   * @param timer 
   */

  reset(timer: number) {
    Observable.timer(timer).subscribe(() => {
        this.visitorForm.reset({
            mobilenum:'',
            name:''
        });
       
        this.visitorcopy = null;
        
        this.submitted=false;
       
      });
  }


  onSubmit() {
    this.submitted=true;
    this.visitor = this.visitorForm.value;
    this.visitor.mobilenum= this.visitor.mobilenum;
    this.visitor.name=this.visitor.name;

    this.mobilenumber= this.visitor.mobilenum;
    console.log("a"+ this.mobilenumber);
    this.visitor.contactPersons= [];
    setTimeout(() => { this.submitted=false; }, 2000);
    console.log('post');
    this.visitorService.checkVisitor(this.visitorForm.value.mobilenum).subscribe(visitor=> {this.visitorcheck=visitor;
    if(this.visitorcheck.mobilenum==this.mobilenumber)
    {
      if(this.visitor.name.length!=0)
       {
        console.log("visitor name:" + this.visitorForm.value.name);
        this.visitorService.updateVisitorName(this.visitorForm.value.mobilenum,this.visitorForm.value.name);
      }
      window.location.assign("/home/"+this.mobilenumber+"/contactPersons");
       this.reset(1000);
    }
    else{
      this.visitorService.submitVisitors(this.visitorForm.value)
        .subscribe(visitor => {this.visitorcopy = visitor;
                    console.log('visitor service');
                    window.location.assign("/home/"+this.mobilenumber+"/contactPersons");
                    console.log('path log');
                    this.reset(1000);
                    },errmess => {
                                 this.visitor = <any>errmess;
                                 this.submitted = false;
                                 this.reset(0);
                                 }
                  );
         console.log("b"+ this.mobilenumber);
                }
  });
    

/*  
this.visitorService.checkVisitor(this.visitorForm.value.mobilenum).subscribe(function() {
  console.log("All ok" );

  console.log('visitor service1');
 // window.location.assign("/home/"+this.mobilenumber+"/contactPersons");
  this.reset(1000);

}, function(response) {
  console.log(response);
  console.log("Error with status code", response.status);
  this.statuscode=response.status;


  this.visitorService.submitVisitors(this.visitorForm.value)
      .subscribe(visitor => {this.visitorcopy = visitor;
                  console.log('visitor service');
                  window.location.assign("/home/"+this.mobilenumber+"/contactPersons");
                  console.log('path log');
                  this.reset(1000);
                  },errmess => {
                               this.visitor = <any>errmess;
                               this.submitted = false;
                               this.reset(0);
                               }
                );
       console.log("b"+ this.mobilenumber);

});

*/

if(this.statuscode==404){
  this.visitorService.submitVisitors(this.visitorForm.value)
  .subscribe(visitor => {this.visitorcopy = visitor;
              console.log('visitor service');
              window.location.assign("/home/"+this.mobilenumber+"/contactPersons");
              console.log('path log');
              this.reset(1000);
              },errmess => {
                           this.visitor = <any>errmess;
                           this.submitted = false;
                           this.reset(0);
                           }
            );
   console.log("b"+ this.mobilenumber);
          }

/*
this.visitorService.checkVisitor(this.visitorForm.value.mobilenum).subscribe(function() {
  console.log("All ok" );

  console.log('visitor service1');
  window.location.assign("/home/"+this.mobilenumber+"/contactPersons");
  this.reset(1000);

}, function(response) {
  console.log(response);
  console.log("Error with status code", response.status);
this.statuscode=response.status;
});


if(this.statuscode==404){
this.visitorService.submitVisitors(this.visitorForm.value)
.subscribe(visitor => {this.visitorcopy = visitor;
            console.log('visitor service');
            window.location.assign("/home/"+this.mobilenumber+"/contactPersons");
            console.log('path log');
            this.reset(1000);
            },errmess => {
                         this.visitor = <any>errmess;
                         this.submitted = false;
                         this.reset(0);
                         }
          );
 console.log("b"+ this.mobilenumber);
        }
*/


/*
this.visitorService.checkVisitor(this.visitorForm.value.mobilenum).
    subscribe(visitor => {this.visitorcheck=visitor;
              console.log('gfhfgj'+this.visitorcheck);
          if(this.visitorcheck.mobilenum==this.mobilenumber)
//if(this.visitorService.checkVisitor(this.visitorForm.value.mobilenum).subscribe(visitor => console.log(visitor.mobilenum))==null)

{    console.log('visitor service1');
//window.location.assign("/home/"+this.mobilenumber+"/contactPersons");
//this.reset(1000);
} 
else{
 this.visitorService.submitVisitors(this.visitorForm.value).subscribe(visitor => {this.visitorcopy = visitor;
     console.log('visitor service');
     window.location.assign("/home/"+this.mobilenumber+"/contactPersons");
      console.log('path log');
      this.reset(1000);
       },errmess => {
                            this.visitor = <any>errmess;
                            this.submitted = false;
                            this.reset(0);
                          }
        );
        console.log("b"+ this.mobilenumber);
       }  // 

      });
*/
      }

} 