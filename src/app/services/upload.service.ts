import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  constructor(private http: HttpClient, private _api: ApiService) {}

  UploadPhoto(formData: FormData) {
    return this._api.apiCaller(
      this._api.postMethod,
      this._api.UploadURL,
      formData, {
        reportProgress: true,
        observe: "events",
      });
  }

  GetCroppedData(formData: FormData) {
    return this._api
      .apiCaller(this._api.postMethod, this._api.GetCroppedData, formData, {
        reportProgress: true,
        observe: "events",
      });
  }

  GetDownloadFile(formData: FormData) {
    return this._api
      .apiCaller(this._api.postMethod, this._api.GetDownloadFile, formData, {
        reportProgress: true,
        observe: "events",
      });
  }

  GetUseCountForFreeUser(formData: FormData){
    return this._api
      .apiCaller(this._api.postMethod, this._api.GetUseCountForFreeUser, formData, {
        reportProgress: true,
        observe: "events",
      });
  }
}
