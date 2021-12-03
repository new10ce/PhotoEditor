import { NgModule } from '@angular/core';
import { PagesLayoutComponent } from '../../shared/components/pages-layout/pages-layout.component';
import { HomeLayoutComponent } from '../../shared/components/home-layout/home-layout.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CropPhotoComponent } from './crop-photo/crop-photo.component';
import { DownloadPhotoComponent } from './download-photo/download-photo.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SupportComponent } from './support/support.component';
import { PlanComponent } from './plan/plan.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';
import { VerificationComponent } from './verification/verification.component';
import { DashboardLayoutComponent } from 'src/app/shared/components/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhotoSettingsComponent } from './photo-settings/photo-settings.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ],
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'upload-photo', component: UploadPhotoComponent }],
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'crop-photo', component: CropPhotoComponent }],
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'download', component: DownloadPhotoComponent }],
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'privacy', component: PrivacyComponent }]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'support', component: SupportComponent }]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'plan', component: PlanComponent }]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'user-info', component: UserDetailsComponent }]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'confirm-order', component: ConfirmOrderComponent }]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'checkout', component: CheckoutComponent }]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'user/register', component: RegisterComponent }]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'user/email/verification/:id', component: VerificationComponent }]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [{ path: 'user/dashboard', component: DashboardComponent }]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [{ path: 'user/payments', component: PaymentsComponent }]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [{ path: 'user/profile', component: ProfileComponent }]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [{ path: 'settings', component: PhotoSettingsComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
