import {Injectable} from '@angular/core';
import { FormInput } from './app.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BlogsComponent } from './models/blog';
import { Directive, HostListener, HostBinding } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LoggingService{

blogArray: Observable<BlogsComponent[]>;

private subject = new Subject<any>();

selectedItems : FormInput [] = [];
allItems: any;
arrayKey: any;
loginFlag = false;
getSelectedItemsValue = new Subject();
loginDetail: any;
newUser: any;
_headerFlag = false;
notificationObject: any ;
blogTextArray =[
  {"id":1, "text":"Your text goes here...."},
  {"id":2, "text":"Your text goes here...."},
  {"id":3, "text":"Your text goes here...."},
  {"id":4, "text":"Your text goes here...."}

]	

arrayData = [
				{"id": 1,"question":"What's the name of your first company? "},
				{"id": 2,"question":"What's the name of your favourite place? "},
				{"id": 3,"question":"What's your nick name? "}
			];

constructor(private _http: Http) { }


/*bindShortCutKey() {
	@HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
    if (event.key == 'Escape') {
        this.popupFlag = false;
        this.popup = '';
        this.deletePopupFlag = false;
        this.deletePopup = '';
    }
  }
}*/

keys(){
	return ({
		'(document: keydown.ALT.a)': 'hotkeys($event, "Command + a")',
	  	'(document: keydown.ALT.s)': 'hotkeys($event, "Command + s")',
	  	'(document: keydown.control.ALT.d)': 'hotkeys($event, "CTRL+ALT+D")',
	  	'(document: keydown.control.r)': 'hotkeys($event, "Command + r")'
		});
}			

getBlogs(): Observable<BlogsComponent[]> {
    if (!this.blogArray) {
      this.blogArray = this._http.get('../../assets/data/blogs.json')
        .map((res: Response) => res.json());
    }
    return this.blogArray;
  }
  getBlogArray() {
  	let textArray = localStorage.getItem("blogArray");
  	if (textArray ==null || textArray =="" || textArray =="null") {
  	localStorage.setItem("blogArray", JSON.stringify(this.blogTextArray));
  	return this.blogTextArray;
  	} else {
  		return JSON.parse(textArray);
  	}

  }
addText(obj?, array?){
    array.push (obj);
    localStorage.setItem("blogArray", JSON.stringify(array));
    return array;
  }
saveTextArea(_index?, _data?, _value?) {
	let textArray = JSON.parse(localStorage.getItem("blogArray"));
	textArray[_index].text = _value ;
	localStorage.setItem("blogArray", JSON.stringify(textArray));
	return textArray;
}
addItem(data : any, index: any){	
	data.userType = 'user' ;
	this.arrayKey = JSON.parse(localStorage.getItem('userArray'));
	((this.arrayKey == null) && (this.arrayKey =[])) ;
	if (index!== null && index!== undefined) {
		this.arrayKey[index] = data;
	} else {
		this.arrayKey.push(data);
	}
    localStorage.setItem('userArray', JSON.stringify(this.arrayKey))
}

// get all user list
getItem() {
	this.allItems = JSON.parse(localStorage.getItem('userArray')) ;
	((this.allItems == null) && (this.allItems =[])) ;
	return this.allItems;
}

// validate login user
validateLoginUser(/*_email, _password*/_loginPara) {

	this.loginDetail = localStorage.getItem('loginDetail');
	if (this.loginDetail == "null" || this.loginDetail == null || this.loginDetail == "") {
		alert("no user")
		return;
	}
	this.loginDetail = JSON.parse(this.loginDetail);	
	if (this.loginDetail.length && this.loginDetail.length > 0){
    for (var i = 0; i < this.loginDetail.length; i++) {
      if (this.loginDetail[i].email ===_loginPara.loginEail && this.loginDetail[i].password === _loginPara.loginPassword){
      	if (this.loginDetail[i].userType === 'user') {
      		this._headerFlag = true;
      	}
      	localStorage.setItem('loginData', JSON.stringify({"email":_loginPara.loginEail, "firstName": this.loginDetail[i].firstName}));
      	this.subject.next({name: this.loginDetail[i].userType});
        this.loginFlag = true;
        return true;
      } 
	}
	} else {
		if (this.loginDetail.email ===_loginPara.loginEail && this.loginDetail.password === _loginPara.loginPassword){
      	if (this.loginDetail.userType === 'user') {
      		this._headerFlag = true;
      	}
      	localStorage.setItem('loginData', JSON.stringify({"email":_loginPara.loginEail, "firstName": this.loginDetail.firstName}));
      	this.subject.next({name: this.loginDetail.userType});
        this.loginFlag = true;
        return true;
      }
	}
	if(this.loginFlag == false){
        return false;
    	}
}

getMsg(): Observable<any> {
	return this.subject.asObservable();
}

// signUp user
signUpUserValidation(_obj) {
	if (_obj.signUpPassword === _obj.signUpConfirmPassword) {	
		this.newUser = {email: _obj.signUpEail, password: _obj.signUpPassword, userType: 'admin', mobileNumber: _obj.signUpMobileNumber, firstName: _obj.signUpFirstName, dob: _obj.signUpDOB, answer: _obj.answer, question: _obj.question, id: _obj.id}
		this.loginDetail = localStorage.getItem('loginDetail');
		if (this.loginDetail == null || this.loginDetail == "null" || this.loginDetail == ""){
		localStorage.setItem('loginDetail', JSON.stringify([this.newUser])) ;
		return true;
		} else {
			this.loginDetail = JSON.parse(this.loginDetail);
			this.loginDetail.push(this.newUser);
	    localStorage.setItem('loginDetail', JSON.stringify(this.loginDetail))
		return true;	
		}	    
		}
		else {
			return false;
		}
}

notify(_type, _message) {
	this.notificationObject = {"type": _type, "message": _message};
}
showNotification() {
	return this.notificationObject;
}

}