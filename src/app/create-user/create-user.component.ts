import { Component, OnInit } from '@angular/core';
import { FormInput/*, DropdownList */} from './../app.model';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
	nameFlag;
  model = new FormInput();
	title = 'Registration Form';
	successFlag = false;
	obj;
  notificationFlag = false;
  constructor(private serviceData : LoggingService) {
   }

  ngOnInit() {}

  getFormDetails(event) {
    console.log("this.model--", this.model);
  	this.nameFlag = true;
    this.obj = this.model;
    this.model  = new FormInput();
    this.serviceData.addItem(this.obj, null);
    this.notificationFlag = true;
    this.serviceData.notify("success", "added successfully");    
    this.successFlag = true;
  }

}    