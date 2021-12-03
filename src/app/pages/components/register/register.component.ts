import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticateModel, RegisteredUser } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  formLogin: FormGroup;
  submitted = false;
  loginSubmitted = false;
  isSuccess = false;
  user: RegisteredUser = <RegisteredUser>{};
  emailCount: number = 0;
  isLoginSuccess = true;
  isLoginDisplayed = false;
  isForgotPasswordDisplayed = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.createRegisterForm();
    this.createLoginForm();
  }

  get f() {
    return this.formRegister.controls;
  }

  get frm() {
    return this.formLogin.controls;
  }

  createLoginForm(){
    this.formLogin = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength]],
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

  createRegisterForm() {
    this.formRegister = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phone: ["", Validators.required],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength]],
        confirm_password: ['', [Validators.required]],
      }, {validator: this.passwordConfirming}),
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
          )
        ],
      ],
    });
  }
 
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    
    if (c.get('password').value !== c.get('confirm_password').value) {
      c.get('confirm_password').setErrors({'noMatch': true});
      return {invalid: true};
    }
  }
  
  onUserRegister() {
    this.submitted = true;
    if (this.formRegister.invalid || this.emailCount > 0) {
      return;
    }
    this.RegisterUser(this.formRegister.value);    
  }

  showForgotPassword(){
    this.isLoginDisplayed = true;
    this.isForgotPasswordDisplayed = false;
  }

  ClearStyles(){
    this.emailCount = 0;
  }

  onLogin(){
    this.loginSubmitted = true;
    if (this.formLogin.invalid) {
      return;
    }
    
    this.ValidateCredentials(this.formLogin.value);    
  }
  
  RegisterUser(user: RegisteredUser) {
    user.password = this.formRegister.get('passwords').get('password').value;    
    this.customerService.RegisterUser(user).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          //this.customerId = response.Data;
          //this.utilityService.ShowMsg('customer registered successfully', this.utilityService.success);
          //this.router.navigate(['room/checkin/', this.roomId , this.customerId]);
          // localStorage.setItem(
          //   "user-info",
          //   JSON.stringify(this.formRegister.value, null, 4)
          // );
          // this.router.navigate(["checkout"]);
          this.onReset("register");
          this.isSuccess = true;
        }
      },
      (err: HttpErrorResponse) => {
        //this.utilityService.ShowMsg(err.message, this.utilityService.error);
      }
    );
  }

  ValidateCredentials(credentials: AuthenticateModel) {
    this.customerService.AuthenticateUser(credentials).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          //console.log(response.Data);
          //this.customerId = response.Data;
          //this.utilityService.ShowMsg('customer registered successfully', this.utilityService.success);
          //this.router.navigate(['room/checkin/', this.roomId , this.customerId]);
          localStorage.setItem(
            "registered-user",
            JSON.stringify(response.Data, null, 4)
          );
          this.router.navigate(["user/dashboard"]);                 
        }
      },
      (err: HttpErrorResponse) => {
        this.isLoginSuccess = false;
        //this.utilityService.ShowMsg(err.message, this.utilityService.error);
      }
    );
  }

  CheckEmailAvailbility() {
    var formData = new FormData();
    formData.append('email', this.formRegister.get('email').value);    
    this.customerService.CheckEmailAvailbility(formData).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          var data = response.Data;
          this.emailCount = Number(data["count"]);
        }
      },
      (err: HttpErrorResponse) => {
        //this.utilityService.ShowMsg(err.message, this.utilityService.error);
      }
    );
  }

  onReset(type: string) {
    if (type == "login"){
      this.loginSubmitted = false;
      this.formLogin.reset();
    }
    else {
      this.submitted = false;
      this.formRegister.reset();
    }
  }
}
