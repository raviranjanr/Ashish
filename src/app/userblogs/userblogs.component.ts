import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { BlogsComponent } from '../models/blog';

@Component({
  selector: 'app-userblogs',
  templateUrl: './userblogs.component.html',
  styleUrls: ['./userblogs.component.css']
})
export class UserblogsComponent implements OnInit {
	blogList: BlogsComponent[];
	addedTextArea:any;
	textValue=[];
	disableFlag= [];
	hideEdit= [];
	hideCancel= [];
	public addFlag: any;

  constructor(private serviceData : LoggingService) {}

  ngOnInit() {
  	/*this.serviceData.getBlogs().subscribe((data) => {
      this.blogList = data;
      this.setTextValue();
    });*/
    this.blogList = this.serviceData.getBlogArray();
    this.setTextValue();
    this.addFlag= true;
  }

  setTextValue() {
  	for (var i = 0; i < this.blogList.length; ++i) {
  		this.textValue[i]="";
  		this.disableFlag[i] = true;
  		this.hideEdit[i] = true;
  		this.hideCancel[i] = false;
  	}
  }

  addTextArea() {
  	this.addedTextArea = {"id": this.blogList.length +1, "text": 'New text here....'};
  	this.blogList = this.serviceData.addText(this.addedTextArea, this.blogList);
  	this.setTextValue();
  }
  saveTextArea(_index, content) {  	
  	this.blogList = this.serviceData.saveTextArea(_index, this.blogList, content);
  	this.hideEdit[_index] = true;
  	this.hideCancel[_index] = false;
  	this.disableFlag[_index] = true;
  }
  editTextArea(_index) {
  	this.disableFlag[_index] = false;
  	this.hideEdit[_index] = false;
    this.hideCancel[_index] = true;

  }
  cancelTextArea(_index) {
  	this.disableFlag[_index] = true;
  	this.hideEdit[_index] = true;
    this.hideCancel[_index] = false;
  }

}