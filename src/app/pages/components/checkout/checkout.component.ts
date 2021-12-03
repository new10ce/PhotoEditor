import { Component, NgZone, OnInit } from "@angular/core";
import { Customer } from "src/app/models/customer";
import { Router } from "@angular/router";
import { ProfessionalPhotoUserService } from "src/app/services/professional-photo-user.service";
import { ProfessionalPhotoUserOrder } from "src/app/models/professional-photo-user";
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';

declare let paypal: any;

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  loadAPI: Promise<any>;
  orderModel: ProfessionalPhotoUserOrder = <ProfessionalPhotoUserOrder>{};
  customer: Customer = <Customer>{};
  shippingType: string = "Free";
  shippingTypePrice: string = "Free";
  ETA: string = "";
  shippingPrice: number = 0;
  item: string;
  ddlItems: any[] = [
    { id: 0, name: "6 photos", price: "10.99" },
    { id: 1, name: "12 photos", price: "12.99" },
  ];
  selectedItem = "0";
  Total: string = this.ddlItems[0].price;
  price: number = this.ddlItems[0].price;

  orderId: number;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private orderService: ProfessionalPhotoUserService
  ) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit(): void {
    this.customer = JSON.parse(localStorage.getItem("user-info"));
    this.CalculateShippingPrice(this.shippingType);
    //   this.ddlShipping = [
    //     { id: 1, name: "7 photos", price:"2" },
    //     { id: 2, name: "14 photos", price: "4" },
    //  ];
    console.log(this.customer);
    paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "buynow",
        },
        createOrder: (data, actions) => {
          this.CreateOrder();
          return actions.order.create({
            purchase_units: [
              {
                // amount: {
                //     value: this.Total.toString()
                // }
                amount: {
                  value: "0.1",
                },
              },
            ],
          });
        },
        payment: (data, actions) => {
          return actions.payment.create({
            payment: {
              transactions: [
                { amount: { total: this.Total.toString(), currency: "USD" } },
              ],
            },
          });
        },
        onAuthorize: (data, actions) => {
          return actions.payment.execute().then((payment) => {
            //Do something when payment is successful.
            //alert('on Authorize method');
          });
        },
        onApprove: (data, actions) => {
          // This function captures the funds from the transaction.
          return actions.order.capture().then((details) => {
            // This function shows a transaction success message to your buyer.
            //localStorage.removeItem('user-info');
            console.log(data.orderID);
            this.UpdateOrder(data.orderID);
            localStorage.setItem("orderID", data.orderID);
            localStorage.setItem("ETA", this.ETA);
            this.ngZone.run(() => this.router.navigate(["/confirm-order"]));
          });
        },
        onCancel: function (data, actions) {
          // Show a cancel page or return to cart
        },
      })
      .render("#paypal-button-container");

    // paypal
    //   .Buttons({
    //     style: {
    //       layout: "vertical",
    //       color: "gold",
    //       shape: "rect",
    //       label: "buynow",
    //     },
    //     env: "sandbox", // Or 'production'
    //     // Set up the payment:
    //     // 1. Add a payment callback
    //     createOrder: (data, actions) => {
    //       data = {
    //         currencyCode: "USD",
    //         amount: "0.01",
    //         returnUrl: "http://localhost:14789/api/checkout/approved/23234",
    //         cancelUrl: "http://localhost:14789/api/checkout/cancel/23234",
    //         customerId: "",
    //       };
    //       return fetch("http://localhost:14789/api/checkout/create", {
    //         method: "post",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //       })
    //         .then(function (res) {
    //           return res.json();
    //         })
    //         .then(function (orderData) {
    //           console.log(orderData);
    //           return orderData.orderID;
    //         });
    //       // return actions.order.create({
    //       //   purchase_units: [
    //       //     {
    //       //       amount: {
    //       //           value: this.Total.toString()
    //       //       }
    //       //     },
    //       //   ],
    //       // });
    //     },
    //     onApprove: function (data, actions) {
    //       return fetch(
    //         "http://localhost:14789/api/checkout/" + data.orderID + "/capture/",
    //         {
    //           method: "post",
    //         }
    //       )
    //         .then(function (res) {
    //           return res.json();
    //         })
    //         .then((orderData) => {
    //           // Three cases to handle:
    //           //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
    //           //   (2) Other non-recoverable errors -> Show a failure message
    //           //   (3) Successful transaction -> Show confirmation or thank you

    //           // This example reads a v2/checkout/orders capture response, propagated from the server
    //           // You could use a different API or structure for your 'orderData'
    //           var errorDetail =
    //             Array.isArray(orderData.details) && orderData.details[0];

    //           if (errorDetail && errorDetail.issue === "INSTRUMENT_DECLINED") {
    //             return actions.restart(); // Recoverable state, per:
    //             // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
    //           }

    //           if (errorDetail) {
    //             var msg = "Sorry, your transaction could not be processed.";
    //             if (errorDetail.description)
    //               msg += "\n\n" + errorDetail.description;
    //             if (orderData.debug_id) msg += " (" + orderData.debug_id + ")";
    //             return alert(msg); // Show a failure message
    //           }

    //           // Show a success message
    //           // alert(
    //           //   "Transaction completed by " + orderData.payer.name.given_name
    //           // );
    //           localStorage.setItem("orderID", data.orderID);
    //           //localStorage.setItem("ETA", this.ETA);
    //           //this.ngZone.run(() => this.router.navigate(["/confirm-order"]));
    //           //this.router.navigate(["/confirm-order"]);
    //         });
    //     },
    //   })
    //   .render("#paypal-button-container");
  }

  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("body")[0].getElementsByTagName("script");
    for (var i = 0; i < scripts.length; ++i) {
      if (
        scripts[i].getAttribute("src") != null &&
        scripts[i].getAttribute("src").includes("paypal")
      ) {
        scripts[i].src = "https://www.paypal.com/sdk/js?client-id=" + environment.paypalClientId + "&intent=capture&disable-funding=credit,card";
        isFound = true;
      }
    }
    // if (!isFound) {
    //   var dynamicScripts = [
    //     "https://www.paypal.com/sdk/js?client-id=AXUpM6PbFnNZUGiBNR_o3a2BUBcSEterFUr8u1DAt54WmAWU7wBPNl3_L3J4evpIJdw1Deal0TWvjeGY&vault=true&intent=subscription&disable-funding=credit,card",
    //   ];

    //   for (var i = 0; i < dynamicScripts.length; i++) {
    //     let node = document.createElement("script");
    //     node.src = dynamicScripts[i];
    //     node.type = "text/javascript";
    //     node.async = false;
    //     node.charset = "utf-8";
    //     document.getElementsByTagName("body")[0].appendChild(node);
    //   }
    // }
  }

  CreateOrder = () => {
    // ETA: string = "";
    //OrderId		OrderNo	CreatedDate	Item				Image
    this.orderModel.userId = this.customer.customerId;
    this.orderModel.shippingType = this.shippingType;
    this.orderModel.totalAmount = Number(this.Total);
    this.orderModel.shippingAmount = Number(this.shippingPrice);
    this.orderModel.itemPrice = Number(this.price);
    this.orderModel.image = localStorage.getItem("uploadedImage");
    this.orderModel.item = this.ddlItems[this.selectedItem].name;

    this.orderService.CreateOrder(this.orderModel).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          var data = response.Data;
          this.orderId = data.orderId;
        }
      },
      (err: HttpErrorResponse) => {
        //this.utilityService.ShowMsg(err.message, this.utilityService.error);
      }
    );
  };

  UpdateOrder = (orderNo: string) => {
    this.orderModel.userId = this.customer.customerId;
    this.orderModel.orderId = this.orderId;
    this.orderModel.orderNo = orderNo;

    this.orderService.UpdateOrder(this.orderModel).subscribe(
      (response: any) => {
        if (response.Succeeded) {
          var data = response.Data;
        }
      },
      (err: HttpErrorResponse) => {
        //this.utilityService.ShowMsg(err.message, this.utilityService.error);
      }
    );
  };

  onCustomerEdit() {
    localStorage.setItem("user-info", JSON.stringify(this.customer, null, 4));
    this.router.navigate(["user-info"]);
  }

  onPriceChange(event) {
    const value = event.target.value;
    this.price = this.ddlItems[value].price;
    this.calculateTotal();
  }

  onShippingTypeChange(event) {
    if (event.target.checked) {
      this.CalculateShippingPrice(event.target.value);
    }
  }

  CalculateShippingPrice(value) {
    if (value == "Standard") {
      this.shippingPrice = 5;
      this.shippingTypePrice = "$" + this.shippingPrice;
      this.shippingType = value;
      this.ETA = "4 - 5";
    } else if (value == "Express") {
      this.shippingPrice = 10;
      this.shippingTypePrice = "$" + this.shippingPrice;
      this.shippingType = value;
      this.ETA = "2 - 3";
    } else {
      this.shippingTypePrice = "Free";
      this.shippingPrice = 0;
      this.shippingType = value;
      this.ETA = "7 - 10";
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.Total = (Number(this.shippingPrice) + Number(this.price)).toFixed(2);
  }
}
