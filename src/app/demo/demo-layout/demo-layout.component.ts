import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';

@Component({
    selector: 'demo-layout',
    templateUrl: './demo-layout.component.html',
    styleUrls: ['./demo-layout.component.scss']
})
export class DemoLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Layout - SMN UI Demos');
        this.toolbarService.set('Layout');
    }

    ngAfterViewInit() {
        this.toolbarService.activateExtendedToolbar();
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }
}
