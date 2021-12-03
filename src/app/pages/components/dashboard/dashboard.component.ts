import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  firstName: string;
  userId: number;
  loadAPI: Promise<any>;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
  });
  }

  ngOnInit(): void {
    var data = JSON.parse(localStorage.getItem("registered-user"));
    this.firstName = data.user.FirstName;
    this.userId = data.user.UserId;
    paypal
      .Buttons({
        createSubscription: function (data, actions) {
          //return actions.subscription.create({ "plan_id": "P-1S841916A0596462EMA6DINA" });
          return actions.subscription.create({
            plan_id: "P-1YU27494BC5519509MA7K3DY",
          });
        },
        // onApprove: function (data, actions) {
        //   // alert(
        //   //   "You have successfully created subscription " + data.subscriptionID
        //   // );
        //   this.RegisteredUserPayment(data.subscriptionID);  
        // },
        onApprove : (data , actions) => {     
          this.RegisteredUserPayment(data.subscriptionID);
          alert(
             "You have successfully created subscription " + data.subscriptionID
          );
        }
      })
      .render("#paypal-button-container");
  }

  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("body")[0].getElementsByTagName("script");
    for (var i = 0; i < scripts.length; ++i) {
      if (
        scripts[i].getAttribute("src") != null &&
        scripts[i].getAttribute("src").includes("paypal")
      ) {
        scripts[i].src = "https://www.paypal.com/sdk/js?client-id=" + environment.paypalClientId + "&vault=true&intent=subscription&disable-funding=credit,card";
        isFound = true;
      }
    }
    // if (!isFound) {
    //   var dynamicScripts = [
    //     "https://www.paypal.com/sdk/js?client-id=" + environment.paypalClientId + "&vault=true&intent=subscription&disable-funding=credit,card"
    //   ];
    //   for (var i = 0; i < dynamicScripts.length; i++) {
    //     let node = document.createElement("script");
    //     node.src = dynamicScripts[i];
    //     //document.getElementsByTagName("body")[0].appendChild(node);
    //     document.body.insertBefore(node, document.body.firstChild);
    //   }
    // }
  }

  RegisteredUserPayment = (subscriptionId: string) => {
    var formData = new FormData();
    formData.append("subscriptionId", subscriptionId);
    formData.append("userId", this.userId.toString());
    this.customerService.RegisteredUserPayment(formData).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          var data = response.Data;
          // this.useCountForFreeUser = data["count"];
        }
      },
      (error: HttpErrorResponse) => {
        // this.utilityService.ShowMsg(error.message, this.utilityService.error);
      }
    );
  };

  CreateOrder = () => {
    // this.orderModel.userId = this.customer.customerId;
    // this.orderModel.shippingType = this.shippingType;
    // this.orderModel.totalAmount = Number(this.Total);
    // this.orderModel.shippingAmount = Number(this.shippingPrice);
    // this.orderModel.itemPrice = Number(this.price);
    // this.orderModel.image = localStorage.getItem("uploadedImage");
    // this.orderModel.item = this.ddlItems[this.selectedItem].name;
    // this.orderService.CreateOrder(this.orderModel).subscribe(
    //   (response: any) => {
    //     if (response.Succeeded) {
    //       var data = response.Data;
    //       this.orderId = data.orderId;
    //     }
    //   },
    //   (err: HttpErrorResponse) => {
    //     //this.utilityService.ShowMsg(err.message, this.utilityService.error);
    //   }
    // );
  };

  onSignOut() {
    localStorage.removeItem("registered-user");
    this.router.navigate(["../home"]);
  }
}
