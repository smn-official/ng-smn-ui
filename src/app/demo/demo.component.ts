import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ToolbarService} from '../smn-ui/toolbar/toolbar.service';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService]
})
export class DemoComponent implements OnInit {
    title: String;

    constructor(private titleService: Title, private toolbarService: ToolbarService) {
        toolbarService.titleChange.subscribe(title => {
            this.title = title;
        });
    }

    ngOnInit() {
        this.titleService.setTitle('SMN UI Demos');
        this.toolbarService.setTitle('SMN UI Demos');
    }

}
