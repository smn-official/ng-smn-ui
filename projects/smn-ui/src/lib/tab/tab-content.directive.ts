import {ContentChild, Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[uiTabContent]'
})
export class UiTabContentDirective {
    @ContentChild(TemplateRef, { static: false }) template: TemplateRef<any>;

    constructor() { }
}
