import {
    Component, ElementRef, Output, TemplateRef, ViewChild,
    ViewEncapsulation, EventEmitter, Input
} from '@angular/core';

@Component({
    selector: 'ui-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiDialogComponent {
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
    @Output() closeChange: EventEmitter<any> = new EventEmitter();
    @Input('card-size') cardSize: number;

    constructor(public elementRef: ElementRef) {
    }

    close() {
        this.closeChange.emit();
    }
}
