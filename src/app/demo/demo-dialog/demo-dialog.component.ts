import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';
import {UiDialog} from '../../smn-ui/dialog/dialog.service';

@Component({
    selector: 'demo-dialog',
    templateUrl: './demo-dialog.component.html',
    styleUrls: ['./demo-dialog.component.scss']
})
export class DemoDialogComponent implements OnInit, AfterViewInit {

    constructor(private titleService: Title,
                private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Dialog - SMN UI Demos');
        this.toolbarService.set('Dialog');
    }

    ngAfterViewInit() {
    }

    openDialog() {
        alert('ae');
    }

    openWithService(dialogRef) {
        UiDialog.show(dialogRef);
    }

    closeWithService() {
        UiDialog.hide();
    }
}
