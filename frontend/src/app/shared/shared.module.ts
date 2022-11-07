import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { ChatItemComponent } from './layout/chat-item/chat-item.component';
import { ChatListComponent } from './layout/chat-list/chat-list.component';
import { DialogComponent } from './layout/dialog/dialog.component';

@NgModule({
  declarations: [
    TopbarComponent,
    ChatItemComponent,
    ChatListComponent,
    DialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopbarComponent,
    ChatItemComponent,
    ChatListComponent,
    DialogComponent
  ]
})
export class SharedModule { }
