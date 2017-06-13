import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'demo-toolbar',
    templateUrl: './demo-toolbar.component.html',
    styleUrls: ['./demo-toolbar.component.scss']
})
export class DemoToolbarComponent implements OnInit {
    checkboxTest = true;
    checkboxTest2 = true;
    radioTest = 2;
    radioTest2 = 2;

    constructor() {
    }

    ngOnInit() {
    }

}
