import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoComponent implements OnInit {
    title: String;

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('SMN UI Demos');
    }

}
