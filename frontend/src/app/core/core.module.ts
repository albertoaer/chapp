import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './services/chat.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MessagingService } from './services/messaging.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    ChatService,
    UserService,
    MessagingService
  ]
})
export class CoreModule { }
