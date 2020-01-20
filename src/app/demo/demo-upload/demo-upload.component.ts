import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UiToolbarService } from '../../../../projects/smn-ui/src/lib/smn-ui.module';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'ui-demo-upload',
    templateUrl: './demo-upload.component.html',
    styleUrls: ['./demo-upload.component.scss']
})
export class DemoUploadComponent implements OnInit, AfterViewInit, OnDestroy {
    files: any;

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        this.files = [];
    }

    ngOnInit() {
        this.toolbarService.set('Upload');
        this.titleService.setTitle('Upload - SMN UI Demos');
    }

    ngAfterViewInit() {
        this.toolbarService.activateExtendedToolbar(600);
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }

    file() {
        console.log(this.files);
    }

}
