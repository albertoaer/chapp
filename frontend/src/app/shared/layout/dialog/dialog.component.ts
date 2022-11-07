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

  @HostListener("click", ['$event'])
  click(event: Event) {
    if (event.target == this.element.nativeElement) this.close();
  }

  close() {
    if (this.closable)
      this.display = 'none';
  }
}
