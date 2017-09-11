import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[addClock]'
})
export class UiAddClockDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}

}
