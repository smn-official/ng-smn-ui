import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UiToolbarService } from '../../../../projects/smn-ui/src/lib/smn-ui.module';
import { UiElement } from '../../../../projects/smn-ui/src/lib/utils/providers/element.provider';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'demo-inputs',
    templateUrl: './demo-inputs.component.html',
    styleUrls: ['./demo-inputs.component.scss']
})
export class DemoInputsComponent implements OnInit {
    list: string[];
    textarea: string;
    profileForm: FormGroup;
    // @ViewChild('test') test;

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        this.list = ['São Paulo', 'Ohio', 'New York'];
        this.profileForm = new FormGroup({
            name: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl(),
        });
    }

    ngOnInit() {
        this.titleService.setTitle('Input - SMN UI Demos');
        this.toolbarService.set('Input');
        this.textarea = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi asperiores aspernatur blanditiis cumque eligendi error excepturi expedita facilis fugit, in maxime minus modi omnis placeat porro quidem sit tenetur totam?';
        // setTimeout(() => {
        //     UiElement.focus(this.test.nativeElement);
        // }, 2000);
    }

}
