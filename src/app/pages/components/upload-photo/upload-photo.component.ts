import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
} from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { UploadService } from "src/app/services/upload.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-upload-photo",
  templateUrl: "./upload-photo.component.html",
  styleUrls: ["./upload-photo.component.css"],
})
export class UploadPhotoComponent implements OnInit {
  public waiting_panel: boolean = false;
  public browse_panel: boolean = true;
  plan: string = '';
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private uploadService: UploadService, private apiService: ApiService, private router: Router) {
    this.plan = localStorage.getItem("plan");
  }

  ngOnInit(): void {}

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];

    let fileExtension: string = fileToUpload.name
      .split("?")[0]
      .split(".")
      .pop();

    const formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    this.uploadService.UploadPhoto(formData).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          var data = response.Data;
          localStorage.setItem(
            "uploadedImage",
            this.apiService.UploadImagePath + data["fileName"]
          );
          if(this.plan == 'professional')
          {
            this.router.navigate(["/user-info"]);
          }
          else
            this.router.navigate(["/crop-photo"]);
        }
      },
      (error: HttpErrorResponse) => {
        // this.utilityService.ShowMsg(error.message, this.utilityService.error);
      }
    );
  };
}
