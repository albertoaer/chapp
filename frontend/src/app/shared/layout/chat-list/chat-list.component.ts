import { Component } from '@angular/core';
import { Chat } from '@shared/models';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {

  chats: Chat.ChatItem[] = [];

  constructor() { }
}
