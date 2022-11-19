import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { ChatItemComponent } from './layout/chat-item/chat-item.component';
import { ChatListComponent } from './layout/chat-list/chat-list.component';
import { DialogComponent } from './layout/dialog/dialog.component';
import { RouterModule } from '@angular/router';
import { UserIdPipe } from './pipes/user-id.pipe';

@NgModule({
  declarations: [
    TopbarComponent,
    ChatItemComponent,
    ChatListComponent,
    DialogComponent,
    UserIdPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TopbarComponent,
    ChatItemComponent,
    ChatListComponent,
    DialogComponent,
    UserIdPipe
  ]
})
export class SharedModule { }
