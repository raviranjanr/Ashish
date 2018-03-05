import { Component, OnInit } from '@angular/core';
import { CreateUserComponent } from '../create-user/create-user.component';
import { LoggingService } from '../logging.service';
import { AppComponent } from '../app.component';
import { Directive, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']/*,
  providers: [LoggingService]*/
})
export class ListComponent implements OnInit {
	getDetailArray = [];
	arrayFlag;
	popupFlag = false; 
  deletePopupFlag = false;
	selectedRecord;
  index;
	items: any;
  popup;
  notificationFlag = false;
  deletePopup;
  constructor(private serviceData : LoggingService, private appComponentData : AppComponent) {}

  @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
    if (event.key == 'Escape') {
        this.popupFlag = false;
        this.popup = '';
        this.deletePopupFlag = false;
        this.deletePopup = '';
    }
  }

  ngOnInit() {
  	this.getDetailArray = this.serviceData.getItem();
    this.getDetailArray.length>0 &&	(this.arrayFlag = true);
    this.appComponentData.redirectToHomePage(true, false);
  }
  getRowDetails(_data, _index) {
    this.popup = 'flag';
    this.index = _index;
  	this.popupFlag = true;
  	this.selectedRecord = _data;
  }
  deleteRow(_data, _index) {
    this.deletePopup = 'flag';
  	this.items = JSON.parse(localStorage.getItem('userArray'));
  	this.items.splice(_index , 1);
    this.deletePopupFlag = true;
  }
  deleteSuccessFullyRecord(_boolean) {
    if (_boolean) {
        localStorage.setItem('userArray', JSON.stringify(this.items));
        this.getDetailArray = this.serviceData.getItem();
        this.serviceData.notify("success", "deleted successfully");
        this.deletePopup = '';
        this.deletePopupFlag = false;
    } else {
        this.deletePopupFlag = false;
        this.deletePopup = '';
    }
  }
  updateRecord(dataItem) {
    this.popup = '';
    this.getDetailArray[this.index].firstName = this.selectedRecord.firstName; 
    this.getDetailArray[this.index].lastName = this.selectedRecord.lastName;
    this.getDetailArray[this.index].userName = this.selectedRecord.userName;
    this.getDetailArray[this.index].userEmail = this.selectedRecord.userEmail;
    this.getDetailArray[this.index].number = this.selectedRecord.number;
    this.serviceData.addItem(this.getDetailArray[this.index], this.index);
  	this.popupFlag = false;
    this.getDetailArray = this.serviceData.getItem();
    this.notificationFlag = true;
    this.serviceData.notify("success", "updated successfully");        
  }
  cancel(_event) {
    this.getDetailArray = this.serviceData.getItem();
    this.getDetailArray.length>0 &&  (this.arrayFlag = true);
    this.popupFlag = false;
    this.popup = '';
  }
}