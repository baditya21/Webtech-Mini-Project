import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddimageComponent } from './addimage/addimage.component';
import { AllimagesComponent } from './allimages/allimages.component';
import { DeleteimageComponent } from './deleteimage/deleteimage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'addimage', component: AddimageComponent},
  {path: 'deleteimage', component: DeleteimageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'allimages', component: AllimagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
