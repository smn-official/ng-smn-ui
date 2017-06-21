import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';

@Component({
    selector: 'demo-data-tables',
    templateUrl: './demo-data-tables.component.html',
    styleUrls: ['./demo-data-tables.component.scss']
})
export class DemoDataTablesComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Data Tables - SMN UI Demos');
        this.toolbarService.setTitle('Data Tables');
    }

    ngAfterViewInit() {
        this.toolbarService.activateExtendedToolbar();
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }
}
