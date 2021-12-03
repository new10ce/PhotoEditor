import { Component, Input, OnInit } from '@angular/core';
import { RegisteredUser } from 'src/app/models/customer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: RegisteredUser;
  @Input() display: boolean;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("registered-user"))   
    {
      this.currentUser = JSON.parse(localStorage.getItem("registered-user"));
    } 
  }
}
