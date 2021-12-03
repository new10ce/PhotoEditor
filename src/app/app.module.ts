import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { HomeLayoutComponent } from './shared/components/home-layout/home-layout.component';
import { PagesLayoutComponent } from './shared/components/pages-layout/pages-layout.component';
// import { IonicModule } from '@ionic/angular';

import { ApiService } from './services/api.service';
import { UtilityService } from './services/utility.service';
import { LoaderService } from './services/loader.service';
import { UploadService } from './services/upload.service';
import { CropService } from './services/crop.service';
import { CustomerService } from './services/customer.service';
import { ProfessionalPhotoUserService } from './services/professional-photo-user.service';
import { DashboardLayoutComponent } from './shared/components/dashboard-layout/dashboard-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    MainHeaderComponent,
    BannerComponent,
    HomeLayoutComponent,
    PagesLayoutComponent,
    DashboardLayoutComponent    
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    // IonicModule.forRoot()
  ],
  providers: [
    ApiService, 
    UtilityService,
    LoaderService,
    UploadService,
    CropService,
    CustomerService,
    ProfessionalPhotoUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
