import { Component, ViewChild } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/domain';
import { DialogComponent } from '@shared/layout/dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('dialog')
  dialog!: DialogComponent;
  
  activeId: User.Identification | null = null;

  constructor(user: UserService) {
    user.idChange().subscribe(id => this.activeId = id);
  }
}
