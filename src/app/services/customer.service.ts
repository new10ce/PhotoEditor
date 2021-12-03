import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AuthenticateModel, Customer, RegisteredUser } from '../models/customer';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private _api: ApiService) { }
  
  AddCustomer(customerModel: Customer) {
    return this._api.apiCaller(this._api.postMethod, this._api.CreateCustomer, customerModel);
  }

  RegisterUser(registeredUserModel: RegisteredUser){
    return this._api.apiCaller(this._api.postMethod, this._api.RegisterUser, registeredUserModel);
  }

  AuthenticateUser(authenticateModel: AuthenticateModel){
    return this._api.apiCaller(this._api.postMethod, this._api.AuthenticateUser, authenticateModel);
  }

  CheckEmailAvailbility(formData: FormData)
  {
    return this._api.apiCaller(this._api.postMethod, this._api.CheckEmailAvailbility, formData, {
      reportProgress: true,
      observe: "events",
    });
  }

  ActivateUser(formData: FormData)
  {
    return this._api.apiCaller(this._api.postMethod, this._api.ActivateUser, formData, {
      reportProgress: true,
      observe: "events",
    });
  }
  
  RegisteredUserPayment(formData: FormData){
    return this._api.apiCaller(this._api.postMethod, this._api.RegisteredUserPayment, formData);
  }
  // GetPaypalTransaction(orderId: any) {
  //   var body = JSON.stringify(orderId);
  //   return this._api.apiCaller(this._api.getMethod, this._api.GetPaypalTransaction, body);
  // }
}
