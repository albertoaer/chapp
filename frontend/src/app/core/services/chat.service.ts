import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Chat } from '@shared/domain';
import { catchError, Observable, of, ReplaySubject } from 'rxjs';
import { API_URL } from 'src/app/app.config';

@Injectable()
export class ChatService {

  private chats$: ReplaySubject<Chat.Instance[]> = new ReplaySubject();

  constructor(
    @Inject(API_URL) private apiURL: string,
    private http: HttpClient
  ) { }

  availableChats(): Observable<Chat.Instance[]> {
    return this.chats$.asObservable();
  }

  reloadChats() {
    this.http.get<HttpResponse<any>>(`${this.apiURL}/chats/all`, {observe: 'response'})
    .pipe(catchError(err => of(err))).subscribe((data: any) => {
      if (data?.status === 200)
        this.chats$.next(data.body.chats);
    });
  }
}
