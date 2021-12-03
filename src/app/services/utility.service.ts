import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public title = "";
  public success = "success";
  public error = "error";
  public warning = "warning";

  constructor(
    private toaster: ToastrService,
    private loaderService: LoaderService
  ) { }


  showLoader() {
    this.loaderService.show();
  }
  hideLoader() {
    this.loaderService.hide();
  }

  ShowMsg(msg: string, type: string, dev: boolean = false) {
    let showToaster: boolean;
    if (environment.production && dev == true) {
      showToaster = false;
    }
    else {
      showToaster = true;
    }

    if (environment.production && msg != "" && (msg.includes('Server error') || msg.includes('Http failure'))) {
      showToaster = false;
    }

    if (showToaster) {
      if (type === this.success) {
        this.toaster.success(msg);
      }
      else if (type === this.error) {
        this.toaster.error(msg);
      }
      else if (type === this.warning) {
        this.toaster.warning(msg);
      }
      else {
        if (!environment.production) {
          this.toaster.show(msg, "")
        }
      }
    }
  }
}

