import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  id: string

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.activateAccount();
  }

  activateAccount() {
    var formData = new FormData();
    formData.append('code', this.id);    
    this.customerService.ActivateUser(formData).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          console.log(response.Data);          
        }
      },
      (err: HttpErrorResponse) => {
        //this.utilityService.ShowMsg(err.message, this.utilityService.error);
      }
    );
  }
}
