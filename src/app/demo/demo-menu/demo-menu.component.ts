import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-menu',
    templateUrl: './demo-menu.component.html',
    styleUrls: ['./demo-menu.component.scss']
})
export class DemoMenuComponent implements OnInit {
    text: number;

    constructor() {
        this.text = 0;
    }

    ngOnInit() {
        setTimeout(() => {
            this.text++;
        }, 3000)
    }

    bindFunction() {
        alert('Bind function');
        this.text++;
    }
}
