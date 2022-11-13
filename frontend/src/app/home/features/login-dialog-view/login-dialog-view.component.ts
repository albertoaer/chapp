import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-dialog-view',
  templateUrl: './login-dialog-view.component.html',
  styleUrls: ['./login-dialog-view.component.css']
})
export class LoginDialogViewComponent {

  loginData: Observable<User.LoginData> = this.user.loginData();
  loginError: Observable<string> = this.user.loginError();

  constructor(protected user: UserService) {}
}
