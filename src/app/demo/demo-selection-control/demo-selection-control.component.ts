import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'demo-selection-control',
    templateUrl: './demo-selection-control.component.html',
    styleUrls: ['./demo-selection-control.component.scss']
})
export class DemoSelectionControlComponent implements OnInit {
    checkboxTest = true;
    checkboxTest2 = true;
    radioTest = 2;
    radioTest2 = 2;

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Selection Control - SMN UI Demos');
    }

}
