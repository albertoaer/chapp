import { Component } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { Identification } from '@shared/domain/user';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  identification: Observable<Identification> = this.user.userEvents().pipe(
    filter(ev => ev.type == 'log in'),
    map(ev => ev.identification as Identification)
  );

  constructor(protected user: UserService) {}
}
