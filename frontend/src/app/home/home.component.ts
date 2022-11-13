import { Component, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/domain';
import { DialogComponent } from '@shared/layout/dialog/dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {  
  activeId: User.Identification | null = null;
  subscription: Subscription = this.user.idChange().subscribe(id => this.activeId = id)

  constructor(private user: UserService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
