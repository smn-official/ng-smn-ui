import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';

@Component({
    selector: 'demo-inputs',
    templateUrl: './demo-inputs.component.html',
    styleUrls: ['./demo-inputs.component.scss']
})
export class DemoInputsComponent implements OnInit {

    list: string[];

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        this.list = ['São Paulo', 'Ohio', 'New York'];
    }

    ngOnInit() {
        this.titleService.setTitle('Input - SMN UI Demos');
        this.toolbarService.set('Input');
    }

}
