import {Component, ViewEncapsulation, OnInit, AfterViewInit, ElementRef} from '@angular/core';

import {UiCookie, UiToolbarService} from '../smn-ui/smn-ui.module';
import {UiElement} from '../smn-ui/utils/providers/element.provider';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [UiToolbarService]
})
export class DemoComponent implements OnInit, AfterViewInit {
    title: String;
    menuOpen: boolean;
    menuList: any[];
    itemModel: any;

    constructor(private toolbarService: UiToolbarService, public element: ElementRef) {
        toolbarService.change.subscribe(title => this.title = title);
        this.itemModel = {
            id: 'id',
            parentId: 'idMae',
            url: 'url',
            name: 'nome'
        };
        this.menuList = [
            {id: '3', idMae: '2', nome: 'Teste 3', url: 'teste3'},
            {id: '2', idMae: null, nome: 'Teste 2', url: null},
            {id: '1', idMae: null, nome: 'Teste 1', url: 'teste1'},
        ];

        this.menuList = [
            {
                id: '9lT2QdrpI64',
                idMae: null,
                nome: 'Administração',
                url: null
            },
            {
                id: 'bXDW7UY-RGE',
                idMae: 'uhqGQJ7GzEQ',
                nome: 'Assunto Contrato',
                url: 'assunto-contrato'
            },
            {
                id: 'C3Ns7GWgEBM',
                idMae: 't9CfntxgLmI',
                nome: 'Cargo',
                url: null
            },
            {
                id: '-XE0EwaskVE',
                idMae: 'uhqGQJ7GzEQ',
                nome: 'Cliente',
                url: 'cliente'
            },
            {
                id: 'hrR3dEI9USU',
                idMae: 't9CfntxgLmI',
                nome: 'Colaborador',
                url: null
            },
            {
                id: 'uhqGQJ7GzEQ',
                idMae: null,
                nome: 'Comercial',
                url: null
            },
            {
                id: 'hTlXx7XzS08',
                idMae: '9lT2QdrpI64',
                nome: 'Empresa',
                url: null
            },
            {
                id: 'BJXpy8TrIXk',
                idMae: 'uhqGQJ7GzEQ',
                nome: 'Grupo Empresarial',
                url: 'grupo-empresarial'
            },
            {
                id: 't9CfntxgLmI',
                idMae: null,
                nome: 'Recursos Humanos',
                url: null
            },
            {
                id: 'Awdn-Mf6B-E',
                idMae: '9lT2QdrpI64',
                nome: 'Unidade',
                url: null
            }
        ];
    }

    ngOnInit() {
        this.menuOpen = false;

        const isNavDrawerPersistent = UiCookie.get('NavDrawerPersistent') === 'true';

        if (isNavDrawerPersistent) {
            this.menuOpen = true;
        }

        this.toolbarService.registerMainToolbar(document.getElementById('app-header'));
    }

    ngAfterViewInit() {
    }
}
