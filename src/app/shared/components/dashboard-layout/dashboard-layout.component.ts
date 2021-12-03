import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem("registered-user"))    
      this.router.navigate(["../home"]);    
  }
}
