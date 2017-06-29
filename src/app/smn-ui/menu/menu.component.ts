import {Component, ElementRef, Input, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ui-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiMenuComponent {
    @Input('theme-class') themeClass;
    @Input() align;
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    constructor(public elementRef: ElementRef) {
    }

}
