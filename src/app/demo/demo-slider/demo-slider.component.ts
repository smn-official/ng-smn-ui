import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-slider',
    templateUrl: './demo-slider.component.html',
    styleUrls: ['./demo-slider.component.scss']
})
export class DemoSliderComponent implements OnInit {

    begin: number;
    end: number;
    range: number[] = Array.apply(null, {length: 11}).map(Number.call, Number);

    constructor() {
        this.begin = 2;
        this.end = 7;
    }

    ngOnInit() {
    }

}
