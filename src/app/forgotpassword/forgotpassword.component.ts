import { Component, OnInit } from '@angular/core';
import { ForgotPasswordField } from './../app.model';
import { Router } from '@angular/router';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

	forgotModel = new ForgotPasswordField();
	loginDetail: any;
	buttonName:any;
	mobileFlag = false;
	emailFlag = false;
	answerFlag = false;
	objectFlag = false;
	arrayFlag = false;
	mobileNum = "";
	answer = "";
	question="";
	newPassword=false;
	index;
  questionArray:any ;
  	constructor(private router: Router, private serviceData : LoggingService) {}

  ngOnInit() {
  	this.buttonName = "Next" ;
  	this.loginDetail = JSON.parse(localStorage.getItem('loginDetail')) ;
    this.questionArray = this.serviceData.arrayData;
  }

  findQuestion(_id) {
    for (var i = 0; i < this.questionArray.length; ++i) {
      if (_id == this.questionArray[i].id) {
        this.question = this.questionArray[i].question;
        break;
      }
    }
  }

  forgotPasswordFun() {
  	this.forgotModel.forgotEail;

  	(this.newPassword) && this.generatNewPassword() ;
  	(this.answerFlag) && ((this.answer === this.forgotModel.forgotAnswer) && (this.newPassword= true)) ;
    
  	if (this.mobileFlag) {
  		this.validateMobileNumber();
  	} else {
  	if (this.loginDetail.length === undefined) {
  		if (this.loginDetail.email == this.forgotModel.forgotEail) {
  			this.mobileNum = this.loginDetail.mobileNumber;
  			this.answer = this.loginDetail.answer;
        this.findQuestion(this.loginDetail.id);
  			this.mobileFlag = true;
  			this.objectFlag = true;
  			return;
  		}
  		else {
  			alert("Invalid email")
  		}
  	} else {
  		for (var i = 0; i < this.loginDetail.length; ++i) {
  			if (this.loginDetail[i].email == this.forgotModel.forgotEail) {
  			this.mobileNum = this.loginDetail[i].mobileNumber;
  			this.answer = this.loginDetail[i].answer;
        this.findQuestion(this.loginDetail[i].id);
  			this.mobileFlag = true;
  			this.emailFlag = true;
  			this.arrayFlag = true;
  			this.index =i;
  			return;
	  		}
  		}
  		if (this.emailFlag == false) {
  			alert("Invalid email")
  		}
  	}
  }
  }
  generatNewPassword() {
  	if (this.objectFlag) {
  			this.loginDetail.password = this.forgotModel.forgotPassword;
  			localStorage.setItem('loginDetail', JSON.stringify(this.loginDetail));
  			alert("update successfully");
  			this.router.navigate(['/login']);
  		}	
  		else {
  			this.loginDetail[this.index].password = this.forgotModel.forgotPassword;
  			localStorage.setItem('loginDetail', JSON.stringify(this.loginDetail));
  			alert("update successfully");
  			this.router.navigate(['/login']);
  		}
  }
  validateMobileNumber() {
  	if (this.objectFlag === true) {
  			((this.mobileNum == this.forgotModel.forgotMobileNumber)? ((this.answerFlag = true) && (this.buttonName = "Submit")): alert("!mobile")) ;
  		}
  		else if(this.arrayFlag === true) {
  			((this.mobileNum == this.forgotModel.forgotMobileNumber)? ((this.answerFlag = true) && (this.buttonName = "Submit")): alert("!mobile")) ;
  		}
  }



  

}