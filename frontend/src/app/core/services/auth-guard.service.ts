import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@shared/domain';
import { Observable, Subscription } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {

  private identification: User.Identification | null = null;
  private idSubscription: Subscription;

  constructor(private router: Router, user: UserService) {
    this.idSubscription = user.userEvents().subscribe(ev => {
      if (ev.type === 'log in' || ev.type === 'log out')
      this.identification = ev.identification;
      if (ev.type === 'log out')
        this.forceUserAuth(router.routerState.snapshot.url);
    });
  }

  currentId(): User.Identification | null {
    return this.identification;
  }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.identification != null) return true;
    this.forceUserAuth(state.url);
    return false;
  }

  private forceUserAuth(origin: string) {
    this.router.navigate(['/home'], {
      queryParams: { 'origin': origin }
    });
  }

  ngOnDestroy(): void {
    this.idSubscription.unsubscribe();
  }
}
