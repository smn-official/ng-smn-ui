import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'demo-input',
    templateUrl: './demo-input.component.html',
    styleUrls: ['./demo-input.component.scss']
})
export class DemoInputComponent implements OnInit {

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Input - SMN UI Demos');
    }

}
