import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { DeleteimageComponent } from './deleteimage/deleteimage.component';
import { AddimageComponent } from './addimage/addimage.component';
import { AllimagesComponent } from './allimages/allimages.component';
import { HttpClientModule } from '@angular/common/http'
import { SerService } from './ser.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    DeleteimageComponent,
    AddimageComponent,
    AllimagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
