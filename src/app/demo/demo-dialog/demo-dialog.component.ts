import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';
import {UiDialog} from '../../smn-ui/dialog/dialog.service';

@Component({
    selector: 'demo-dialog',
    templateUrl: './demo-dialog.component.html',
    styleUrls: ['./demo-dialog.component.scss']
})
export class DemoDialogComponent implements OnInit, AfterViewInit {
    states: string[];
    statesFiltered: string[];
    allStates: any[];
    searchState;
    loading;
    timing;
    allStatesFiltered: any[];
    teste;

    constructor(private titleService: Title,
                private toolbarService: UiToolbarService) {
        this.states = ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Brasília Amarela'];
        this.allStates = [{
            name: 'São Paulo',
            country: 'Brazil'
        }, {
            name: 'Rio de janeiro',
            country: 'Brazil'
        }, {
            name: 'New York',
            country: 'USA'
        }, {
            name: 'Florida',
            country: 'USA'
        }, {
            name: 'Virginia',
            country: 'USA'
        }, {
            name: 'Ohio',
            country: 'USA'
        }];
        this.statesFiltered = this.states;
        this.allStatesFiltered = this.allStates;
    }

    ngOnInit() {
        this.titleService.setTitle('Dialog - SMN UI Demos');
        this.toolbarService.set('Dialog');
    }

    ngAfterViewInit() {
    }

    openDialog() {
        alert('ae');
    }

    openWithService(dialogRef) {
        UiDialog.show(dialogRef);
    }

    closeWithService() {
        UiDialog.hide();
    }

    teste2(item) {
        console.log(item);
        console.log(this);
    }

    loadMore() {
        if (this.teste) {
            return;
        }

        this.teste = true;

        this.allStatesFiltered = [...this.allStates, ...[{
            name: 'Brasilia',
            country: 'Brazil'
        }, {
            name: 'Santa catarina',
            country: 'Brazil'
        }, {
            name: 'Malibu',
            country: 'USA'
        }, {
            name: 'Dublin',
            country: 'Irland'
        }, {
            name: 'Galway',
            country: 'Irland'
        }, {
            name: 'Tokio',
            country: 'Japan'
        }]];
        console.log('teste');
    }

    search() {
        clearInterval(this.timing);

        this.loading = true;

        this.timing = setTimeout(() => {
            this.loading = false;
            if (!this.searchState) {
                this.statesFiltered = this.states;
                return;
            }
            this.statesFiltered = this.states.filter(item => {
                return (item.indexOf(this.searchState) !== -1);
            });
        }, 300);
    }

    searchAll() {
        clearInterval(this.timing);

        this.loading = true;

        this.timing = setTimeout(() => {
            this.loading = false;
            if (!this.searchState) {
                this.allStatesFiltered = this.allStates;
                return;
            }
            this.allStatesFiltered = this.allStates.filter(item => {
                return (item.name.indexOf(this.searchState) !== -1);
            });
        }, 300);
    }
}
