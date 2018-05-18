import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'ui-list-items',
    templateUrl: 'items.component.html'
})

export class UiListItemsComponent implements OnInit {
    @Input() items: any;

    constructor() {
    }

    ngOnInit() {
    }
}
