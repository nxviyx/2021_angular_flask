import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-frontend';
  login_status:boolean
  
  constructor(){
    this.login_status = JSON.parse(sessionStorage.getItem("isLoggedIn"))
  }

}
