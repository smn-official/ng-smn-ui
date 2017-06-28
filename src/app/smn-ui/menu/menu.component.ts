import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ui-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiMenuComponent implements OnInit {
    @Input() darkClass;
    @Input() align;
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    constructor(public elementRef: ElementRef) {
    }

    ngOnInit() {
    }

}
