import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { ChatItemComponent } from './layout/chat-item/chat-item.component';
import { ChatListComponent } from './layout/chat-list/chat-list.component';
import { DialogbaseComponent } from './dialogs/dialogbase/dialogbase.component';

@NgModule({
  declarations: [
    TopbarComponent,
    ChatItemComponent,
    ChatListComponent,
    DialogbaseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopbarComponent,
    ChatItemComponent,
    ChatListComponent,
    DialogbaseComponent
  ]
})
export class SharedModule { }
