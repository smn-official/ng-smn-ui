import {ContentChild, Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[uiTabLabel]'
})
export class UiTabLabelDirective {
    @ContentChild(TemplateRef) template: TemplateRef<any>;

    constructor() {
    }

}
