import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-smart-list',
    templateUrl: './demo-smart-list.component.html',
    styleUrls: ['./demo-smart-list.component.scss']
})
export class DemoSmartListComponent implements OnInit {
    teste: {};
    lista: any[];
    listaAuxiliar: any[];

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        this.teste = {};
        this.lista = [];
        this.listaAuxiliar = [];
    }

    ngOnInit() {
        this.titleService.setTitle('Smart list - SMN UI Demos');
        this.toolbarService.set('Smart list');
        setTimeout(() => {
            this.lista = [{a: '1111', b: '5555', ity: true}];
        });
    }
}
