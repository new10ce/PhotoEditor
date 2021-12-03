import { Component, OnInit } from "@angular/core";
@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  orderID: string = '';
  ETA: string = '';

  constructor() {}

  ngOnInit(): void {    
    this.orderID = localStorage.getItem('orderID');
    this.ETA = localStorage.getItem('ETA');
  } 
}
