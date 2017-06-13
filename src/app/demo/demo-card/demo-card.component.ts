import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'demo-card',
    templateUrl: './demo-card.component.html',
    styleUrls: ['./demo-card.component.scss']
})
export class DemoCardComponent implements OnInit {

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Card - SMN UI Demos');
    }

}
