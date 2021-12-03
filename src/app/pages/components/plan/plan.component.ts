import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getPhotoPlan = (plan) => {
    localStorage.setItem('plan', plan);
    this.router.navigate(['upload-photo']);
  }
}
