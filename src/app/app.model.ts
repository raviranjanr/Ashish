export class FormInput {		
	userName:string;
	firstName:string;
	lastName:string;
	password:string;
	confirmPassword:string;
	userEmail:string;
	number:number;
	// constructor(name?: string, firstname? : string, lastname? : string, pswd? : string, confirmPswd? : string, email?: string) {
	// 	this.userName = name ;
	// 	this.firstName = firstname ;
	// 	this.lastName = lastname ;
	// 	this.password = pswd ;
	// 	this.confirmPassword = confirmPswd ;
	// 	this.userEmail = email ;
	// }
}

export class SignUpField {		
	signUpEail:string;
	signUpPassword:string;
	signUpConfirmPassword:string;
	signUpMobileNumber:any;
	signUpFirstName: any;
	signUpDOB: any;
	answer: any;
}

export class LoginField {		
	loginEail:string;
	loginPassword:string;
	loginConfirmPassword:string;
	loginMobileNumber:any;
	loginFirstName: any;
	loginDOB: any;
}

export class ProfileField {		
	profileFirstName:string;
	profileEmail:string;
	profileMobileNumber:any;
	profileDOB: any;
}

export class Initialize {		
	initializeFlag:any;
	initializeLoginFlag:any;
}

export class DropdownList {
	
	constructor(public id?:number, public question?:string) {
	}
}

export class ForgotPasswordField {		
	forgotEail:string;
	forgotPassword:string;
	forgotMobileNumber:any;
	forgotAnswer: any;
}