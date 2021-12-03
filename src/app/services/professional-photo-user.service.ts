import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ProfessionalPhotoUserOrder } from '../models/professional-photo-user';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalPhotoUserService {

  constructor(private http: HttpClient, private _api: ApiService) { }
  
  CreateOrder(orderModel: ProfessionalPhotoUserOrder) {
    return this._api.apiCaller(this._api.postMethod, this._api.CreateProfessionalPhotoOrder, orderModel);
  }

  UpdateOrder(orderModel: ProfessionalPhotoUserOrder) {
    return this._api.apiCaller(this._api.postMethod, this._api.UpdateProfessionalPhotoOrder, orderModel);
  }
}
