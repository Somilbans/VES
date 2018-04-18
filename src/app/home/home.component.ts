import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {Visitor} from '../shared/visitor';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { VisitorService } from '../services/visitor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  
  visitorForm: FormGroup;
  visitor:Visitor;
  visitorcopy: Visitor;
  
  mobilenumber: number;
  submitted = false;

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

  constructor(private visitorService: VisitorService,private fb: FormBuilder, @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  ngOnInit() {
    }

  createForm() {
    this.visitorForm = this.fb.group({
    mobilenum: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern] ]
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
            mobilenum:''
        });
       
        this.visitorcopy = null;
        
        this.submitted=false;
       
      });
  }


  onSubmit() {
    this.submitted=true;
    this.visitor = this.visitorForm.value;
    this.visitor.mobilenum= this.visitor.mobilenum;
    this.mobilenumber= this.visitor.mobilenum;
    console.log("a"+ this.mobilenumber);
    this.visitor.contactPersons= [];
    console.log(this.visitor);
    setTimeout(() => { this.submitted=false; }, 2000);
  
    this.visitorService.submitVisitors(this.visitorForm.value).subscribe(visitor => {this.visitorcopy = visitor;
      window.location.assign("/home/"+this.mobilenumber);
      this.reset(1000);
       },errmess => {
                            this.visitor = <any>errmess;
                            this.submitted = false;
                            this.reset(0);
                          }
        );
        console.log("b"+ this.mobilenumber);
      // 
  }

} 