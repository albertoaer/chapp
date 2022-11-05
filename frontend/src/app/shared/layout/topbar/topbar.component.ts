import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input('currentGroup')
  currentGroup: string = '';

  enableGroupName: boolean = true;

  ngOnInit(): void {
    const mediaMatchEvent = (ev: { matches: boolean }) => {
      this.enableGroupName = !ev.matches;
    };
    const mmatch = window.matchMedia("(max-width: 700px)");
    mediaMatchEvent(mmatch);
    mmatch.addEventListener("change", mediaMatchEvent);
  }
}
