import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LoginDialogViewComponent } from './features/login-dialog-view/login-dialog-view.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    LoginDialogViewComponent
  ],
  imports: [
    RouterModule.forChild([{path: '', component: HomeComponent}]),
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
