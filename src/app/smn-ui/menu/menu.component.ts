import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ui-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiMenuComponent implements OnInit {

    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    constructor(public elementRef: ElementRef) {
    }

    ngOnInit() {
    }

}
