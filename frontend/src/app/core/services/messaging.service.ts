import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

const CHAT_URL = "ws://localhost:3000/chat";

@Injectable()
export class MessagingService {
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
