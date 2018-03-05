import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	notificationType = "";
	msg = ""
  constructor(private serviceData : LoggingService) {
  let _obj =  this.serviceData.showNotification();
	  if (_obj !== undefined){
        this.notificationType = _obj.type;
        this.msg = _obj.message;
      }
   }

  ngOnInit() {}

  showNotification(type, message) {
  	this.notificationType = type;
  	this.msg = message;
  }


}