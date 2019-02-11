import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-grid',
    templateUrl: './demo-grid.component.html',
    styleUrls: ['./demo-grid.component.scss']
})
export class DemoGridComponent implements OnInit {
    spacing: boolean;

    constructor() {
        this.spacing = true;
    }

    ngOnInit() {
    }

}
