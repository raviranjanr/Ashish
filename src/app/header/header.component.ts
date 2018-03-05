import { Component, OnInit, Directive, HostListener, HostBinding } from '@angular/core';
import { LoggingService } from '../logging.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscription : Subscription;
	toggleFlag : any;
  getDetailArray: any;
  gridFlag = false;
  arrayFlag = false;
  constructor(private serveceData: LoggingService, private router: Router, private appComponentData : AppComponent) {
    this.subscription = this.serveceData.getMsg().subscribe(toggleFlag => {this.toggleFlag =name })
    this.arrayFlag = false;
   }

   @HostListener('document:keydown', ['$event']) onkeydownHandler(event: KeyboardEvent) {
    if (event.key == 'Escape') {
        this.gridFlag = false;
    }
  }

  ngOnInit() {
  }
  logoutUser() {
    setTimeout(()=>{
      this.appComponentData.redirectToHomePage(false, true);
        this.router.navigate(['/login']);
        }, 500);
  }

  getHistory() {
    this.getDetailArray = JSON.parse(localStorage.getItem('loginHistory')) ;
    this.arrayFlag = true;
    this.gridFlag = true;
  }


}