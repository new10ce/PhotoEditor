import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import saveAs from "file-saver";
import { ApiService } from "src/app/services/api.service";
import { UploadService } from "src/app/services/upload.service";

@Component({
  selector: "app-download-photo",
  templateUrl: "./download-photo.component.html",
  styleUrls: ["./download-photo.component.css"],
})
export class DownloadPhotoComponent implements OnInit {
  fileName: string;
  public downloadFileName: string;
  public ipAddress: any;
  useCountForFreeUser: number;
  options = [{ color: "#EE4455" }];
  form = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),
    ]),
  });

  constructor(private uploadService: UploadService, private router: Router, private http: HttpClient, private apiService: ApiService) {
    this.fileName = localStorage.getItem("finalImage");
    this.downloadFileName = localStorage.getItem("mergedfileName");   
  }

  ngOnInit(): void {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
      this.GetUseCountForFreeUser();
    });
  }

  GetUseCountForFreeUser = () => {
    var formData = new FormData();
    formData.append('ipAddress', this.ipAddress);
    this.uploadService.GetUseCountForFreeUser(formData).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          var data = response.Data;
           this.useCountForFreeUser = data["count"];
        }
      },
      (error: HttpErrorResponse) => {
        // this.utilityService.ShowMsg(error.message, this.utilityService.error);
      }
    );   
  }

  onSubmit() {
    //this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    var email = this.form.value["email"];
    //this.downloadFile();
    this.cc(email);
  }

  trimValue(formControl) { formControl.setValue(formControl.value.trim()); }


  public cc = (email) => {
    var formData = new FormData();
    formData.append('email', email);
    formData.append('ipAddress', this.ipAddress);
    formData.append('filePath', this.downloadFileName);
    
    this.uploadService.GetDownloadFile(formData).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          this.downloadFile();
        }
      },
      (error: HttpErrorResponse) => {
        // this.utilityService.ShowMsg(error.message, this.utilityService.error);
      }
    );    
  };

  downloadFile() {
    fetch(this.downloadFileName)
      .then((res) => res.blob()) // Gets the response and returns it as a blob
      .then((blob) => {
        var name = Math.floor(Math.random() * 600000) + 1;
        saveAs(blob, "passport_photo_" + name + ".jpg");
        //let objectURL = URL.createObjectURL(blob);
        // let myImage = new Image();
        // myImage.src = objectURL;
        // document.getElementById('myImg').appendChild(myImage)
         this.router.navigate(["/support"]);
      });
  }
}
