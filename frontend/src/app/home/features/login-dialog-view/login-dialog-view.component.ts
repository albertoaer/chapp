import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/domain';

@Component({
  selector: 'app-login-dialog-view',
  templateUrl: './login-dialog-view.component.html',
  styleUrls: ['./login-dialog-view.component.css']
})
export class LoginDialogViewComponent {

  loginData: User.LoginData | undefined = undefined;
  loginError: string | undefined = undefined;

  constructor(protected user: UserService) {
    this.user.loginData().subscribe(data => this.loginData = data);
    this.user.loginError().subscribe(err => this.loginError = err);
  }
}
