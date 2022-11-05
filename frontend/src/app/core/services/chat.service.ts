import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const CHAT_URL = "ws://localhost:3000/chat";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private ws: WebSocketSubject<string> | undefined;

  private connect(): WebSocketSubject<string> {
    if (!this.ws || this.ws.closed)
        this.ws = webSocket(CHAT_URL);
    return this.ws;
  }

  sendMessage(msg: string) {
    this.connect().next(msg);
  }

  messages(): Observable<string> {
    return this.connect().asObservable();
  }
}
