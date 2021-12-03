import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { HttpEventType, HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import Cropper from "cropperjs";
import { Router } from "@angular/router";
import { UploadService } from "src/app/services/upload.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-crop-photo",
  templateUrl: "./crop-photo.component.html",
  styleUrls: ["./crop-photo.component.css"],
})
export class CropPhotoComponent implements OnInit {
  public waiting_panel: boolean = false;
  public browse_panel: boolean = true;
  public canvas: HTMLCanvasElement;
  public cropperData: Cropper.Data;
  @Output() public onUploadFinished = new EventEmitter();
  @ViewChild("image", { static: false })
  public imageElement: ElementRef;
  imageBlobUrl: string = null;

  //@Input("src")
  public imageSource: string;
  public fileName: string;
  public imageDestination: string;
  private cropper: Cropper;

  public constructor(
    private http: HttpClient,
    private upladService: UploadService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.imageSource = localStorage.getItem("uploadedImage");
    this.imageDestination = "";
    this.fileName = this.imageSource.replace(/^.*[\\\/]/, "");
  }

  public ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        this.canvas = this.cropper.getCroppedCanvas();
        this.imageDestination = this.canvas.toDataURL("image/png");

        this.cropperData = this.cropper.getData();
      },
    });
  }

  public ngOnInit() {}

  // public cropImage = () => {
  //   var url = 'http://nutanusadadiya-001-site1.dtempurl.com/api/upload/GetCroppedData';
  //   var headers = new HttpHeaders({
  //     'Content-Type': 'application/json; charset=utf-8',
  //   });
  //   this.cropperData['fileName'] = this.fileName;
  //   var body = JSON.stringify(this.cropperData);
  //   this.http.post(url, body, { headers: headers }).subscribe((event) => {
  //     // if (event.type === HttpEventType.UploadProgress) {
  //     //   this.browse_panel = false;
  //     //   this.waiting_panel = true;
  //     // } else if (event.type === HttpEventType.Response) {
  //     //   this.router.navigate(['/adjustment']);
  //     // }
  //   });
  // };

  public cropImage = () => {
    var canvas; // some canvas with an image
    var url = this.canvas.toDataURL();

    var blobBin = atob(url.split(",")[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], { type: "image/png" });
    var formData = new FormData();
    var newFileName =
      this.fileName.split(".")[0] + "_2." + this.fileName.split(".")[1];
    formData.append("file", file, newFileName);

    this.upladService.GetCroppedData(formData).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          var data = response.Data;
          localStorage.setItem(
            "finalImage",
            this.apiService.UploadImagePath + data["watermarkedImg"]
          );
          localStorage.setItem(
            "mergedfileName",
            this.apiService.UploadImagePath + data["mergedfileName"]
          );
          // localStorage.setItem(
          //   "croppedImg",
          //   this.apiService.UploadImagePath + data["croppedImg"]
          // );
          this.router.navigate(["/download"]);
        }
      },
      (error: HttpErrorResponse) => {
        // this.utilityService.ShowMsg(error.message, this.utilityService.error);
      }
    );    
  };
}
