import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-menu',
    templateUrl: './demo-menu.component.html',
    styleUrls: ['./demo-menu.component.scss']
})
export class DemoMenuComponent implements OnInit {
    counter: number;
    sizes;
    sizeTarget;

    constructor() {
        this.counter = 0;
        this.sizes = [2, 3, 4, 5, 6, 7];
        this.sizeTarget = this.sizes[0];
    }

    ngOnInit() {
    }

    bindFunction() {
        this.counter++;
    }
}
