import { Component } from '@angular/core';
import { FormInput } from './app.model';
import { Initialize } from './app.model';
import { Router } from '@angular/router';
import { LoggingService } from './logging.service';
import {Http} from '@angular/http';
// import { KeyObject } from './hotKeys';

@Component({
  selector: 'app-root',
  // host: this_obj,
  host: {
  	'(document: keydown.ALT.a)': 'hotkeys($event, "Command + a")',
  	'(document: keydown.ALT.s)': 'hotkeys($event, "Command + s")',
  	'(document: keydown.control.ALT.d)': 'hotkeys($event, "CTRL+ALT+D")',
  	'(document: keydown.control.r)': 'hotkeys($event, "Command + r")'
  },
  templateUrl: './app.component.html',
  //  template: ` Your Text: <input type='text' [(ngModel)]='userText'/><br/>
		// 		<appSimple [simpleInput]='userText'></appSimple>
		// 		<router-outlet></router-outlet>	
  //  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   data: any;
   _obj: any;
	 userText: string = 'Pragim';
	 users = [{email:"ashish24788@gmail.com", password: "You@123", userType: 'admin'}]
	 initializeModel = new Initialize();

	constructor(private router: Router, private serviceData : LoggingService, private http:Http) {

    /*this.http.get('hotKeys.json')
                .subscribe(res => this.data = res.json());
                console.log('this.data', this.data);*/

                 // this.http.get('hotKeys.json')
      // .map((res:Response) => res.json())
      // .subscribe(
      //   data => { this.data = data},
      //   err => console.error(err),
      //   () => console.log('done')
      // );

  //   this._obj = {
  //   '(document: keydown.ALT.a)': 'hotkeys($event, "Command + a")',
  //   '(document: keydown.ALT.s)': 'hotkeys($event, "Command + s")',
  //   '(document: keydown.control.ALT.d)': 'hotkeys($event, "CTRL+ALT+D")',
  //   '(document: keydown.control.r)': 'hotkeys($event, "Command + r")'
  // }


		if (localStorage.getItem('loginDetail')!==null && localStorage.getItem('loginDetail')!=="null" && localStorage.getItem('loginDetail')!== "" &&  JSON.parse(localStorage.getItem('loginDetail')).length < 1) {
		localStorage.setItem('loginDetail', JSON.stringify(this.users))
		}
		this.initializeModel.initializeFlag = false;
		this.initializeModel.initializeLoginFlag = true;
	}

	hotkeys(event, value) {
		alert();
    console.log('Event', event);
        event.preventDefault();
    switch ( value ) 
    	{
        case "Command + a": 
         return console.log('clicked', value);
        case "Command + s": 
         return console.log('clicked', value);	
        case "CTRL+ALT+D":
         return console.log('CTRL+ALT+D', value);
        case "Command + r":
         return console.log('clicked', value);
    	}
  }

  pressAlt() {
  	console.log("alt pressed");
  }
	redirectToHomePage(_para1, _para2) {
		this.initializeModel.initializeFlag = _para1;
		this.initializeModel.initializeLoginFlag = _para2;
	}
}