import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Visitor} from '../shared/visitor';
import {Contact, ContactType} from '../shared/contact';
import {VisitorService}  from '../services/visitor.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
 
 
  visitorContactForm: FormGroup;

  
  Visitors: Visitor[];
  visitor:Visitor;
  visitorCopy= null;
  visitorMNos: number[];
  errMess: string;
  visitorContact: Contact;
  contactType = ContactType;
   

 // contactType = ContactType;
  /**
 formErrors = {
  contacttype: ''
};

validationMessages = {
 contacttype: {
    required: 'Comment is required.'
  }
};
  */


  constructor(private route: ActivatedRoute,private fb: FormBuilder, private visitorService: VisitorService,@Inject('BaseURL') private BaseURL) {
    this.createForm();
    this.visitorContact= new Contact();
   }

  ngOnInit() {
   // this.visitorService.getVisitors().subscribe(visitors => this.Visitors = visitors,errmess => this.errMess = <any>errmess);

    this.visitorService.getVisitorsMobileNos().subscribe(visitorNos => this.visitorMNos = visitorNos);
    this.route.params.switchMap((params: Params) => {  return this.visitorService.getM(+params['mobilenum']);})
        .subscribe(visitor => {this.visitor = visitor; this.visitorCopy=visitor; },errmess => this.errMess = <any>errmess );
  }


  createForm() {
    this.visitorContactForm = this.fb.group({
  contacttype: [null, [Validators.required]]
  
});
}



onSubmit() {
  
  if(this.visitorContactForm.value){
    this.visitorContact.date = new Date().toISOString();
    this.visitorContact.contacttype = this.visitorContactForm.value.contacttype;
    this.visitorCopy.contactPersons.push(this.visitorContact);
    this.visitorCopy.save().subscribe(visitor => this.visitor = visitor);

  }
  console.log(this.visitorContactForm.value);
  
  this.visitorContactForm.reset({
    contacttype: ''
  });
  window.location.assign("/thankyou")

 }

}