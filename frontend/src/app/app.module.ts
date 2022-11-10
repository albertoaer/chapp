import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { API_URL, WS_URL } from './app.config';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    {provide: API_URL, useValue: 'http://localhost:3000'},
    {provide: WS_URL, useValue: 'ws://localhost:3000'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
