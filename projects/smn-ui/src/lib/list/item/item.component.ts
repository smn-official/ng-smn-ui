import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ui-list-item',
    templateUrl: 'item.component.html'
})

export class UiListItemComponent implements OnInit {
    @Input() item: any;

    constructor() {
    }

    ngOnInit() {
    }
}
