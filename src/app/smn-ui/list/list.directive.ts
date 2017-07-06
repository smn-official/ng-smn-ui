import {Directive, Input} from '@angular/core';

@Directive({selector: '[uiList]'})
export class UiListDirective {
    @Input() uiList: any;

    constructor() {
    }
}
