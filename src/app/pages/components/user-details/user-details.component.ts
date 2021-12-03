import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Customer } from "src/app/models/customer";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  customer: Customer = <Customer>{};
  form: FormGroup;
  submitted = false;
  customerId = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) {}

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.formBuilder.group({
      fullName: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      country: ["", Validators.required],
      zipCode: ["", Validators.required],
      phone: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.createForm();
    if (localStorage.getItem("user-info")) {
      this.customer = JSON.parse(localStorage.getItem("user-info"));
      this.form.patchValue(this.customer);
      this.customerId = this.customer.customerId;
    }
    //localStorage.clear();
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    this.customer = this.form.value;
    this.AddCustomer(this.customer);
  }

  AddCustomer(customer: Customer) {
    customer.customerId = this.customerId;
    this.customerService.AddCustomer(customer).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          //this.customerId = response.Data;
          //this.utilityService.ShowMsg('customer registered successfully', this.utilityService.success);
          //this.router.navigate(['room/checkin/', this.roomId , this.customerId]);
          customer.customerId = response.Data['customerId'];
          localStorage.setItem(
            "user-info",
            JSON.stringify(customer, null, 4)
          );
          this.router.navigate(["checkout"]);
        }
      },
      (err: HttpErrorResponse) => {
        //this.utilityService.ShowMsg(err.message, this.utilityService.error);
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }
}
