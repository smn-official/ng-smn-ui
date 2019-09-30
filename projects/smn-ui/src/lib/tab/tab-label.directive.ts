import {ContentChild, Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[uiTabLabel]'
})
export class UiTabLabelDirective {
    @ContentChild(TemplateRef, { static: false }) template: TemplateRef<any>;

    constructor() {
    }

}
