import { Directive, Attribute, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[ui-autofocus]'
})
export class AutofocusDirective {

    constructor(private el: ElementRef, private render: Renderer) {
        this.el.nativeElement.focus();
    }
}