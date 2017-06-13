import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'demo-toolbar',
    templateUrl: './demo-toolbar.component.html',
    styleUrls: ['./demo-toolbar.component.scss']
})
export class DemoToolbarComponent implements OnInit {
    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Toolbar - SMN UI Demos');
    }

}
