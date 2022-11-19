import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[noSelect]'
})
export class NoSelectDirective {
  @HostBinding('style.user-select')
  userSelect: string = 'none';

  @Input('textSelect')
  set select(value: boolean) {
    this.userSelect = value ? 'text' : 'none';
  }
}
