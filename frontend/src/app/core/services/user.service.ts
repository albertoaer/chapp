import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API_URL } from 'src/app/app.config';
import { User } from '@shared/domain';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService {

  private userEvents$: ReplaySubject<User.UserEvent> = new ReplaySubject();

  private loginData$: BehaviorSubject<User.LoginData> =
    new BehaviorSubject({
      name: localStorage.getItem('login.name') ?? '',
      picture: localStorage.getItem('login.picture') ?? ''
    });

  private loginError$: Subject<string> = new Subject();

  constructor(
    @Inject(API_URL) private apiURL: string,
    private http: HttpClient
  ) {
    this.userEvents$.subscribe(data => {
      const stored = data.type == 'log in' ?
      data.identification :
        { token: '', name: '', id: 0 };
      localStorage.setItem('auth.token', stored.token);
      localStorage.setItem('auth.name', stored.name);
      localStorage.setItem('auth.id', stored.id.toString());
    })
    const token = localStorage.getItem('auth.token');
    const name = localStorage.getItem('auth.name');
    const id = Number.parseInt(localStorage.getItem('auth.id') ?? '');
    if (token && name && id) this.userEvents$.next({
      type: 'log in', identification: { token, name, id }
    })
  }

  userEvents(): Observable<User.UserEvent> {
    return this.userEvents$.asObservable();
  }

  loginData(): Observable<User.LoginData> {
    return this.loginData$.asObservable();
  }

  loginError(): Observable<string> {
    return this.loginError$.asObservable();
  }

  private sendLogin(name: string) {
    this.http.post<HttpResponse<any>>(`${this.apiURL}/users/signin`, {name}, {observe: 'response'})
    .pipe(catchError(err => of(err))).subscribe((data: any) => {
      if (data?.status == 201)
        this.userEvents$.next({ type: 'log in', identification: data.body });
      else
        this.loginError$.next(data?.error?.errors || data?.name);
    });
  }

  logout() {
    this.userEvents$.next({ type: 'log out', identification: null });
  }

  login(data: User.LoginData) {
    if (data.name) {
      this.loginData$.next(data);
      localStorage.setItem('login.name', data.name);
      localStorage.setItem('login.picture', data.picture);
      this.sendLogin(data.name);
    } else {
      this.loginError$.next('An username must be provided');
    }
  }
}
