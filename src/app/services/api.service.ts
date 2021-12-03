import { Injectable, isDevMode } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getMethod = 'get';
  public postMethod = 'post';
  public putMethod = 'put';
  public deleteMethod = 'delete';

  public localAPIpath = environment.hostURL + 'api/';

  public readonly UploadURL = this.localAPIpath + 'upload';
  public readonly customerURL = this.localAPIpath + 'customer';
  public readonly professionalPhotoCheckoutURL = this.localAPIpath + 'professionalphotocheckout';
  public readonly paypalSubscriptionURL = this.localAPIpath + 'PaypalSubscription';
  
  public readonly CreateCustomer = this.customerURL + '/CreateCustomer';
  public readonly CreateProfessionalPhotoOrder = this.professionalPhotoCheckoutURL + '/CreateOrder';
  public readonly UpdateProfessionalPhotoOrder = this.professionalPhotoCheckoutURL + '/UpdateOrder';
  public readonly RegisterUser = this.customerURL + '/RegisterUser';
  public readonly RegisteredUserPayment = this.paypalSubscriptionURL + '/RegisteredUserPayment';
  
  public readonly AuthenticateUser = this.customerURL + '/AuthenticateUser';
  public readonly ActivateUser = this.customerURL + '/ActivateUser';
  public readonly CheckEmailAvailbility = this.customerURL + '/CheckEmailAvailbility';
  public readonly GetCroppedData = this.UploadURL + '/GetCroppedData';
  public readonly GetDownloadFile = this.UploadURL + '/GetDownloadFile';
  public readonly GetUseCountForFreeUser = this.UploadURL + '/GetUseCountForFreeUser';    
  public readonly GetPaypalTransaction = this.UploadURL + '/GetPaypalTransaction';
  public readonly UploadImagePath = environment.hostURL + 'resources/images/';

  public apiCaller(type: string, url: string, data?: any, header?: any): any {
    if (type === 'get') {
      return this.get(url);
    }
    else if (type === 'post') {
      return this.post(url, data);
    }
    else if (type === 'put') {
      return this.put(url, data);
    }
    else if (type === 'delete') {
      return this.delete(url, data);
    }
  }

  private post(url: string, data: any): any {
    return this.http.post(url, data).pipe(
      tap(result => {
        return result;
      }),
      catchError(this.handleError),
    );
  }

  private get(url: string): any {
    return this.http.get(url).pipe(
      tap(result => {
        return result;
      }),
      catchError(this.handleError),
    );
  }

  private put(url: string, data: any): any {
    return this.http.put(url, data, { headers: this.getHeaders() }).pipe(
      tap(result => {
        return result;
      }),
      catchError(this.handleError)
    );
  }

  private delete(url: string, data: any): any {
    return this.http.delete(url).pipe(
      tap(result => {
        return result;
      }),
      catchError(this.handleError)
    );
  }

  public getHeaders(): HttpHeaders {
    var headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'accept': 'application/json',
    });
    return headers;
    // let token = this.cookiservice.get('token');
    // if (token != "") {
    //   return headers.append('Grid-Authorization-Token', token);
    // }
    // else {
    //   return headers;
    // }
  }

  // CheckInvalidToken(result: any) {
  //   if (result) {
  //     let msg: string = result.message.toLocaleLowerCase();
  //     if (
  //       msg.includes('authentication failed') ||
  //       msg.includes('token expired') ||
  //       msg.includes('token header empty')
  //     ) {
  //       let btnLogout = document.getElementById('btnLogout');
  //       if (btnLogout) {
  //         btnLogout.click();
  //       }
  //     }
  //   }
  // }

  private handleError(error: any): Promise<any> {
    try {
      if (error && error.status === 0) {
        const msg = `No internet connection`;
        return Promise.reject(msg);
      }

      if (isDevMode()) {
        console.log(error);
      }

      if (error && error.status && (error.status === 401 || error.status === 403)) {
        return Promise.reject(error);  //  AccessDeniedMsg
      }

      return Promise.reject('error' + (error.error || error.message));
    } catch (e) {
      const msg = `Something goes wrong,please try again later`;
      return Promise.reject(msg);
    }
  }
}
