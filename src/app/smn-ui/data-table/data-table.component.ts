import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UiElementRef} from '../utils/providers/element-ref.provider';

@Component({
    selector: 'ui-data-table',
    templateUrl: 'data-table.component.html'
})

export class UiDataTableComponent implements OnInit {
    @ViewChild('tableFooter') tableFooter: any;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        const self = new UiElementRef(this.element.nativeElement);
        const tfoot = self.querySelector('tfoot');

        if (tfoot) {
            this.tableFooter.nativeElement.appendChild(tfoot.nativeElement);
        }
    }
}
