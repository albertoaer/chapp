import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@shared/domain';
import { Observable, Subscription } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {

  private id: User.Identification | null = null;
  private idSubscription: Subscription;

  constructor(private router: Router, user: UserService) {
    this.idSubscription = user.idChange().subscribe(id => this.id = id);
  }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.id != null) return true;
    this.router.navigate(['/home'], { queryParams: { 'origin': state.url }});
    return false;
  }

  ngOnDestroy(): void {
    this.idSubscription.unsubscribe();
  }
}
