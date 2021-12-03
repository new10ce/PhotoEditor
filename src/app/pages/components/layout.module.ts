import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { HomeComponent } from './home/home.component';
import { CropPhotoComponent } from './crop-photo/crop-photo.component';
import { DownloadPhotoComponent } from './download-photo/download-photo.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';
import { SupportComponent } from './support/support.component';
import { PlanComponent } from './plan/plan.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';
import { VerificationComponent } from './verification/verification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhotoSettingsComponent } from './photo-settings/photo-settings.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    UploadPhotoComponent,
    UploadPhotoComponent,
    HomeComponent,
    CropPhotoComponent,
    DownloadPhotoComponent,
    PrivacyComponent,
    SupportComponent,
    PlanComponent,
    UserDetailsComponent,
    ConfirmOrderComponent,
    CheckoutComponent,
    RegisterComponent,
    VerificationComponent,
    DashboardComponent,
    PhotoSettingsComponent,
    PaymentsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FileSaverModule,
    FormsModule
  ],
})
export class LayoutModule {}
