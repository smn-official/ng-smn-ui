import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'ui-bottom-sheet',
    templateUrl: './bottom-sheet.component.html',
    styleUrls: ['./bottom-sheet.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiBottomSheetComponent {
    @Input('card-size') cardSize: number;
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
    @Output() closeChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef) {
    }

    close() {
        this.closeChange.emit();
    }
}
