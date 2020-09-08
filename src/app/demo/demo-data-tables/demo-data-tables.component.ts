import {Component, OnInit, AfterViewInit, OnDestroy, ElementRef} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService, UiElement} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-data-tables',
    templateUrl: './demo-data-tables.component.html',
    styleUrls: ['./demo-data-tables.component.scss']
})
export class DemoDataTablesComponent implements OnInit, AfterViewInit, OnDestroy {
    list: Array<any>;
    searchOpen: boolean;
    searchText: string;
    checkboxTest: any;

    constructor(private titleService: Title, private toolbarService: UiToolbarService, private element: ElementRef) {
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
        this.titleService.setTitle('Data tables - SMN UI Demos');
        this.toolbarService.set('Data tables');
    }

    ngAfterViewInit() {
        this.toolbarService.activateExtendedToolbar();
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }

    toggleSearch() {
        const inputSearch = this.element.nativeElement.querySelectorAll('input[name="searchText"]')[0];

        if (this.searchOpen) {
            this.searchOpen = false;
            UiElement.closest(inputSearch, 'form').style.right = '';
        } else {
            this.searchOpen = true;
            UiElement.closest(inputSearch, 'form').style.right = UiElement.closest(inputSearch, '.align-right').clientWidth + 'px';

            setTimeout(() => {
                inputSearch.focus();
            }, 280);
        }
    }
}
