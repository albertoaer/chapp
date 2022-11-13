import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/domain';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {  
  activeId: User.Identification | null = null;
  idSubscription: Subscription = this.user.idChange().subscribe(id => {
    this.activeId = id;
    if (this.route.snapshot.queryParams['origin'])
      this.router.navigateByUrl(this.route.snapshot.queryParams['origin']);
  });

  constructor(
    private user: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.idSubscription.unsubscribe();
  }
}
