import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from '../logging.service';
import { LoginField } from '../app.model';
import { AppComponent } from '../app.component';
// import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginDetail;
	loginEail;
	loginPassword;
	// loginSuccessMsgFlag;
	// loginErrorMsgFlag;
  forgotFlag = true;
  loginModel = new LoginField();
  loginObject;
  notificationFlag= false;
  loginCount: any;
  count =0;
  loginHistory: any;
  capatcha: any;
  displayCapatcha: any;
  submittedValue;
  // initializeModel = new Initialize();
  constructor(private router: Router, private serviceData : LoggingService, private appComponentData : AppComponent/*, private notify : NotificationComponent*/) {}
  
  ngOnInit() {
    this.loginCount = localStorage.getItem('loginCount');
    this.generateCaptcha();
    if(this.loginCount !== null) {
      localStorage.setItem('loginCount', JSON.stringify(3)) ;
      this.loginCount = JSON.parse(localStorage.getItem('loginCount'));
    }
  }

  onSubmit(value) {
    this.submittedValue = value;
  }

  generateCaptcha() {
    var a = Math.floor(Math.random() * 10);
    var b = Math.floor(Math.random() * 10);
    var c = Math.floor(Math.random() * 10);
    var d = Math.floor(Math.random() * 10);
    this.displayCapatcha = a.toString() + b.toString()+ c.toString() +d.toString() ;
  }
  validateCapatcha() {
    if (this.displayCapatcha == this.capatcha) {
      return true;
    } else {
      return false;
    }
  }
  loginUser() {
    if (this.count == this.loginCount) {
        this.serviceData.notify("error", "user is blocked");
        this.notificationFlag = true;
    } else {
    this.loginObject = this.loginModel;
    this.loginModel = new LoginField();
    if (this.serviceData.validateLoginUser(this.loginObject) && this.validateCapatcha()) {
      this.serviceData.notify("success", "login successfully");
      this.count = 0 ;
      this.notificationFlag = true;
        setTimeout(()=>{
        this.appComponentData.redirectToHomePage(true, false);
        this.router.navigate(['/home']);

        this.loginHistory = localStorage.getItem('loginHistory');






        if (this.loginHistory == "null" || this.loginHistory == "" || this.loginHistory == null) {
        localStorage.setItem('loginHistory', JSON.stringify([{"email":this.loginObject.loginEail, "timestamp":new Date().getTime()}]));
        } else {
          this.loginHistory = JSON.parse(this.loginHistory) ;
          for (var i = 0; i < this.loginHistory.length; ++i) {
            if (this.loginHistory[i].email == this.loginObject.loginEail) {
                localStorage.setItem('loginHistory', JSON.stringify([{"email":this.loginObject.loginEail, "timestamp":new Date().getTime()}]));
                break;
            } else {
                this.loginHistory.push({"email":this.loginObject.loginEail, "timestamp":new Date().getTime()}) ;
                localStorage.setItem('loginHistory', JSON.stringify(this.loginHistory));
                break;
            }
          }
        }

        }, 1000);

      } else {
        this.count++ ;
        this.serviceData.notify("error", "invalid email and password");
        this.notificationFlag = true;
      }
   }
}

forgotButtonClick() {
  if (this.loginEail !== ""){
    this.forgotFlag = false;
  } else {
    this.forgotFlag = true;
  }
}


}