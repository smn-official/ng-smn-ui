import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-dividers',
    templateUrl: './demo-dividers.component.html',
    styleUrls: ['./demo-dividers.component.scss']
})
export class DemoDividersComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Divider - SMN UI Demos');
        this.toolbarService.set('Divider');
    }

}
