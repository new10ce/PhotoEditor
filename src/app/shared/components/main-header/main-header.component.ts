import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from 'src/app/models/customer';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  currentUser: RegisteredUser;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("registered-user"))   
    {
      this.currentUser = JSON.parse(localStorage.getItem("registered-user"));
      console.log(this.currentUser);
    } 
  }

}
