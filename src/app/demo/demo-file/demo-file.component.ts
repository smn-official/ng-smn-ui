import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UiToolbarService } from '../../../../projects/smn-ui/src/lib/toolbar/toolbar.service';

@Component({
    selector: 'ui-demo-file',
    templateUrl: './demo-file.component.html',
    styleUrls: ['./demo-file.component.scss']
})
export class DemoFileComponent implements OnInit {
    teste: any;
    files: any;
    constructor(private titleService: Title, private toolbarService: UiToolbarService,
        private changeDetector: ChangeDetectorRef) {
        this.files = []
    }

    ngOnInit() {
        this.titleService.setTitle('Files - SMN UI Demos');
        this.toolbarService.set('Files');
    }

    ngAfterViewInit(): void {
        this.files.push({teste: 123});
        this.changeDetector.detectChanges();
    }

    read(file, item, index) {
        console.log({ file, item, index });
    }

    changeFile(listFile: FileList, invalid) {
        // console.log(listFile, invalid);
    }

    error(file, errors, index) {
        // console.log(file, errors, index)
    }
}
