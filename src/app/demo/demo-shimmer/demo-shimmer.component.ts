import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-shimmer',
    templateUrl: './demo-shimmer.component.html',
    styleUrls: ['./demo-shimmer.component.scss']
})
export class DemoShimmerComponent implements OnInit {
    constructor(private titleService: Title,
                private toolbarService: UiToolbarService,
                private _changeDetectorRef: ChangeDetectorRef) {
        this.titleService.setTitle('Shimmer - SMN UI Demos');
        this.toolbarService.set('Shimmer');
    }

    ngOnInit() {
        this.toolbarService.activateExtendedToolbar(960);
        this._changeDetectorRef.detectChanges();
    }

}
