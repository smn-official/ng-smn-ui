import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-toolbars',
    templateUrl: './demo-toolbars.component.html',
    styleUrls: ['./demo-toolbars.component.scss']
})
export class DemoToolbarsComponent implements OnInit {
    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Toolbar - SMN UI Demos');
        this.toolbarService.set('Toolbar');
    }

}
