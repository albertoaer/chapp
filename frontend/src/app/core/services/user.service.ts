import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API_URL } from 'src/app/app.config';
import { User } from '@shared/domain';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService {

  private idStream: ReplaySubject<User.Identification> = new ReplaySubject();

  private loginDataStream: BehaviorSubject<User.LoginData> =
    new BehaviorSubject({
      name: localStorage.getItem('login.name') ?? '',
      picture: localStorage.getItem('login.picture') ?? ''
    });

  private loginErrorStream: Subject<string> = new Subject();

  constructor(
    @Inject(API_URL) private apiURL: string,
    private http: HttpClient
  ) {
    this.idStream.subscribe(data => {
      localStorage.setItem('auth.token', data.token);
      localStorage.setItem('auth.name', data.name);
      localStorage.setItem('auth.id', data.id.toString());
    })
    const token = localStorage.getItem('auth.token');
    const name = localStorage.getItem('auth.name');
    const id = Number.parseInt(localStorage.getItem('auth.id') ?? '');
    if (token && name && id) this.idStream.next({ token, name, id })
  }

  idChange(): Observable<User.Identification> {
    return this.idStream.asObservable();
  }

  loginData(): Observable<User.LoginData> {
    return this.loginDataStream.asObservable();
  }

  loginError(): Observable<string> {
    return this.loginErrorStream.asObservable();
  }

  sendLogin(name: string) {
    this.http.post<HttpResponse<any>>(`${this.apiURL}/users/signin`, {name}, {observe: 'response'})
    .pipe(catchError(err => of(err))).subscribe((data: any) => {
      console.log(data)
      if (data?.status == 201)
        this.idStream.next(data.body);
      else
        this.loginErrorStream.next(data?.error?.errors || data?.name);
    });
  }

  login(data: User.LoginData) {
    if (data.name) {
      this.loginDataStream.next(data);
      localStorage.setItem('login.name', data.name);
      localStorage.setItem('login.picture', data.picture);
      this.sendLogin(data.name);
    } else {
      this.loginErrorStream.next('An username must be provided');
    }
  }
}
