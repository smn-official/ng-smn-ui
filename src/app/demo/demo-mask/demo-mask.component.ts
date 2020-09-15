import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-mask',
    templateUrl: './demo-mask.component.html',
    styleUrls: ['./demo-mask.component.scss']
})
export class DemoMaskComponent implements OnInit {

    cep: number;
    cpf: number | string;
    cnpj: number | string;
    currency;
    date: Date | string;
    float: number;
    integer: number;
    padcnpj;
    padcpf;
    phone: number;
    phonei: number;
    time;
    timeCustom;
    truecnpj;
    truecpf;
    testeCpf: any = {};

    constructor() {
    }

    ngOnInit() {
        this.cpf = 99999999;
        this.truecpf = '777777';
        this.padcpf = '888888';
        this.cnpj = 888888;
        this.phonei = 5511111111111;

        setTimeout(() => {
            this.date = new Date().toISOString();
        }, 2000)
    }

    testSubmit(form) {
        for (const control in form.controls) {
            if (form.controls.hasOwnProperty(control)) {
                form.controls[control].markAsTouched();
                form.controls[control].markAsDirty();
            }
        }

        if (form.valid) {
            form.reset();
        };
    }

}
