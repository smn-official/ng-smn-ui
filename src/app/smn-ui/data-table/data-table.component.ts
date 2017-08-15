import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UiElementRef} from '../utils/providers/element-ref.provider';

@Component({
    selector: 'ui-data-table',
    templateUrl: 'data-table.component.html'
})

export class UiDataTableComponent implements OnInit, AfterViewInit {
    @ViewChild('tableFooter') tableFooter: any;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        const self = new UiElementRef(this.element.nativeElement);
        const tfoot = self.querySelector('tfoot');

        this.tableFooter.nativeElement.appendChild(tfoot.nativeElement);
    }

    ngAfterViewInit() {
        const self = new UiElementRef(this.element.nativeElement);

        const titles = [];

        self.querySelector('th').forEach(item => {
            titles.push(item.nativeElement.innerHTML.trim());
        });

        self.querySelector('tbody tr').forEach((item2, i2) => {
            if (i2 !== 0) {
                titles.forEach((item, i) => {
                    const teste = item2.querySelector('td');
                    if (teste) {
                        teste[i].nativeElement.setAttribute('data-title', item);
                    }
                });
            }
        });
    }
}
