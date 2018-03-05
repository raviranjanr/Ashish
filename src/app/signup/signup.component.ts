import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from '../logging.service';
import { SignUpField, DropdownList } from './../app.model';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	notificationFlag = false;
	signUpModel = new SignUpField();
	signUpSuccessMsgFlag = false;
	signUpErrorMsgFlag = false;
	signupUser;
	signUpObject;
	signUpPassword;
	signUpConfirmPassword;
	loginArray;
	dropDownArray;
	answerFlag;
	flag="";
  	selectedQuestion:DropdownList = new DropdownList(2, "what's the name of your favourite place? " );
  	// selectedQuestion = {"id": 0,"question" : "Select"}
    constructor(private router: Router, private serviceData : LoggingService) {}

   onSelecte(_questionId) {
   	if (_questionId == "") {
   		this.answerFlag = false;
   	} else {
    this.selectedQuestion = null;
    for (var i = 0; i < this.dropDownArray.length; i++) {
        if (this.dropDownArray[i].id == parseInt(_questionId)) {
          this.selectedQuestion = this.dropDownArray[i];
          this.answerFlag = true;
          break;
        }
     }
	}
  }

  ngOnInit() {
  	this.answerFlag = false;
	this.dropDownArray = this.serviceData.arrayData;
  }

	signUpUser() {

		this.signUpObject = this.signUpModel;
		this.signUpObject.id = +this.selectedQuestion.id;
		this.signUpObject.question = this.selectedQuestion.question;
		this.signUpModel  = new SignUpField();
		if (this.serviceData.signUpUserValidation(this.signUpObject)) {
			this.signUpSuccessMsgFlag = true;
			this.notificationFlag = true;
    		this.serviceData.notify("success", "added successfully");    
			setTimeout(()=> {
	  		this.router.navigate(['/login'])
	  		}, 1000)
		}
		else {
			this.notificationFlag = true;
    		this.serviceData.notify("error", "got error");    
			this.signUpErrorMsgFlag = true;
		}
	}
}