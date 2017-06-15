import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ToolbarService} from '../../smn-ui/toolbar/toolbar.service';

@Component({
    selector: 'demo-inputs',
    templateUrl: './demo-inputs.component.html',
    styleUrls: ['./demo-inputs.component.scss']
})
export class DemoInputsComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: ToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Input - SMN UI Demos');
        this.toolbarService.setTitle('Input');
    }

}
