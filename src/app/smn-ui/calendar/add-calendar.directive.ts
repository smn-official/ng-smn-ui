import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[addCalendar]'
})
export class AddCalendarDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
