import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';

@Component({
    selector: 'demo-data-tables',
    templateUrl: './demo-data-tables.component.html',
    styleUrls: ['./demo-data-tables.component.scss']
})
export class DemoDataTablesComponent implements OnInit, AfterViewInit, OnDestroy {
    list: Array<any>;

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        this.list = [
            {
                name: 'Spider',
                surname: 'Man',
                age: Math.floor((Math.random() * 30) + 20)
            },
            {
                name: 'Captain',
                surname: 'Marvel',
                age: Math.floor((Math.random() * 30) + 20)
            },
            {
                name: 'Hulk',
                surname: undefined,
                age: Math.floor((Math.random() * 30) + 20)
            },
            {
                name: 'Thor',
                surname: undefined,
                age: Math.floor((Math.random() * 30) + 20)
            },
            {
                name: 'Iron',
                surname: 'Man',
                age: Math.floor((Math.random() * 30) + 20)
            },
            {
                name: 'Luke',
                surname: 'Cage',
                age: Math.floor((Math.random() * 30) + 20)
            },
            {
                name: 'Black',
                surname: 'Widow',
                age: Math.floor((Math.random() * 30) + 20)
            },
            {
                name: 'Daredevil',
                surname: 'of Hell\'s Kitchen',
                age: Math.floor((Math.random() * 30) + 20)
            }
        ];
    }

    ngOnInit() {
        this.titleService.setTitle('Data Tables - SMN UI Demos');
        this.toolbarService.setTitle('Data Tables');
    }

    ngAfterViewInit() {
        this.toolbarService.activateExtendedToolbar();
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }
}
