import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '@core/services/chat.service';
import { UserService } from '@core/services/user.service';
import { Chat, User } from '@shared/domain';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {  
  identification: User.Identification | null = null;
  availableChats: Observable<Chat.Instance[]> = this.chats.availableChats();

  idSubscription: Subscription = this.user.userEvents().subscribe(ev => {
    this.identification = ev.identification;
    if (this.route.snapshot.queryParams['origin'])
      this.router.navigateByUrl(this.route.snapshot.queryParams['origin']);
    else
      this.chats.reloadChats();
  });

  constructor(
    private user: UserService,
    private chats: ChatService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.idSubscription.unsubscribe();
  }
}
