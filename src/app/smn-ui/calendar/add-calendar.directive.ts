import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[addCalendar]'
})
export class UiAddCalendarDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}

}
