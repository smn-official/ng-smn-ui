import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-mask',
    templateUrl: './demo-mask.component.html',
    styleUrls: ['./demo-mask.component.scss']
})
export class DemoMaskComponent implements OnInit {

    cpf: number;
    cnpj: number;
    date: Date | string;

    constructor() {
    }

    ngOnInit() {
        this.cpf = 99999999;
        this.cnpj = 888888;

        setTimeout(() => {
            this.date = new Date().toISOString();
        }, 2000)
    }

    testSubmit(form) {
        form.reset();
    }

}
