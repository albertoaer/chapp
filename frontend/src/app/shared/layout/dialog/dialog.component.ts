import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  @HostBinding('style.display')
  display: string = 'grid';

  @Input('closable')
  closable: boolean = true;

  constructor(private element: ElementRef) { }

  @Input('openned')
  set openned(state: boolean) {
    this.display = state ? 'grid' : 'none';
  }

  @HostListener("click", ['$event'])
  click(event: Event) {
    if (event.target == this.element.nativeElement && this.closable) this.openned = false;
  }
}
