import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-color-pickers',
    templateUrl: './demo-color-pickers.component.html',
    styleUrls: ['./demo-color-pickers.component.scss']
})
export class DemoColorPickersComponent implements OnInit {

    color: string;

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            this.color = '#263238';
        }, 600);
    }

}
