import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';

@Component({
    selector: 'demo-selection-controls',
    templateUrl: './demo-selection-controls.component.html',
    styleUrls: ['./demo-selection-controls.component.scss']
})
export class DemoSelectionControlsComponent implements OnInit {
    checkboxTest = true;
    checkboxTest2: String = 'S';
    radioTest = 2;
    radioTest2 = 2;
    switchTest: String = 'S';
    switchTest2: String = 'N';

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Selection Control - SMN UI Demos');
        this.toolbarService.set('Selection Control');
    }

}
