import {
    Component, ElementRef, EventEmitter, OnDestroy, Output, TemplateRef, ViewChild,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'ui-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiMenuComponent implements OnDestroy {
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
    @Output() closeChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef) {
    }

    ngOnDestroy() {
        this.close();
    }

    close() {
        this.closeChange.emit();
    }
}
