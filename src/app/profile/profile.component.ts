import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loginData: any;
  loginDetail: any;
  profileData: any;
  constructor() { }

  ngOnInit() {
 	this.loginData = JSON.parse(localStorage.getItem('loginData'));
 	this.loginDetail = JSON.parse(localStorage.getItem('loginDetail'));
 	if (this.loginDetail.length === undefined) {
 		this.profileData = this.loginDetail;
 	} else {
 	for (var i = 0; i < this.loginDetail.length; ++i) {
 		if (this.loginDetail[i].email === this.loginData.email) {
 			this.profileData = this.loginDetail[i];
 			break;
 		}
 	}
 }
 }
  updateProfile() {
  	localStorage.setItem('loginData', JSON.stringify({"email":this.profileData.email, "firstName":this.profileData.firstName}))
  	this.loginDetail = JSON.parse(localStorage.getItem('loginDetail'));
  	if (this.loginDetail.length === undefined) {
  		this.loginDetail.email = this.profileData.email;
  		this.loginDetail.firstName = this.profileData.firstName;
  		this.loginDetail.mobileNumber = this.profileData.mobileNumber;
  		this.loginDetail.dob = this.profileData.dob;
  		localStorage.setItem('loginDetail', JSON.stringify(this.loginDetail))
  	} else {
  		for (var i = 0; i < this.loginDetail.length; ++i) {
		  if (this.loginDetail[i].email == this.profileData.email) {
			this.loginDetail[i].email = this.profileData.email;
	  		this.loginDetail[i].firstName = this.profileData.firstName;
	  		this.loginDetail[i].mobileNumber = this.profileData.mobileNumber;
	  		this.loginDetail[i].dob = this.profileData.dob;
	  		break;
	  	  }
  		}
  		localStorage.setItem('loginDetail', JSON.stringify(this.loginDetail))
  	}
  }

}