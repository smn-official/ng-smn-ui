import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'demo-button',
    templateUrl: './demo-button.component.html',
    styleUrls: ['./demo-button.component.scss']
})
export class DemoButtonComponent implements OnInit {

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Button - SMN UI Demos');
    }

}
