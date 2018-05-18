import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-buttons',
    templateUrl: './demo-select.component.html',
    styleUrls: ['./demo-select.component.scss']
})
export class DemoSelectComponent implements OnInit {
    test
    ;
    names;
    @ViewChild('selectField') selectField;

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        this.names = [
            {id: 1, nome: 'Donatello'},
            {id: 2, nome: 'Leonardo'},
            {id: 3, nome: 'Michelangelo'},
            {id: 4, nome: 'Rafael'},
            {id: 5, nome: 'Mario'},
            {id: 6, nome: 'Ítalo'},
        ];
    }

    ngOnInit() {
        this.titleService.setTitle('Select - SMN UI Demos');
        this.toolbarService.set('Select');
    }

    onChangeModel() {
        console.log(this.test);
        setTimeout(() => {
            this.test = null;
        });
    }
}
