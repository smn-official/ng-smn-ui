import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-mask',
    templateUrl: './demo-mask.component.html',
    styleUrls: ['./demo-mask.component.scss']
})
export class DemoMaskComponent implements OnInit {

    cpf: number;
    constructor() {
    }

    ngOnInit() {
        this.cpf = 99999999;
    }

    testSubmit(form) {
        form.reset();
    }

}
