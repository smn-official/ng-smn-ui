import {Component, Inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';
import {DemoComponent} from '../demo.component';

@Component({
    selector: 'demo-dialog',
    templateUrl: './demo-dialog.component.html',
    styleUrls: ['./demo-dialog.component.scss']
})
export class DemoDialogComponent implements OnInit {

    constructor(private titleService: Title,
                private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Dialog - SMN UI Demos');
        this.toolbarService.set('Dialog');
    }

    openDialog() {
        alert('ae');
    }
}
