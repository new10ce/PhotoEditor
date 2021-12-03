import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { UploadService } from "src/app/services/upload.service";

declare var jQuery: any;

@Component({
  selector: 'app-photo-settings',
  templateUrl: './photo-settings.component.html',
  styleUrls: ['./photo-settings.component.css']
})
export class PhotoSettingsComponent implements OnInit {
  croppedImg: string;
    
    constructor(private uploadService: UploadService, private router: Router, private http: HttpClient, private apiService: ApiService) {
      this.croppedImg = localStorage.getItem("croppedImg");  
    }
  
    ngOnInit(): void { 
      //alert(jQuery('#myRange').val());    
      
    }
}
