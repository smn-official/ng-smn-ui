import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-autocomplete',
    templateUrl: './demo-autocomplete.component.html',
    styleUrls: ['./demo-autocomplete.component.scss']
})
export class DemoAutocompleteComponent implements OnInit {

    states: string[];
    statesFiltered: string[];
    allStates: any[];
    searchState;
    loading;
    timing;
    allStatesFiltered: any[];

    constructor() {
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
    }

    select(item) {
        console.log(item);
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
                return (item.indexOf(this.searchState) !== -1)
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
                return (item.name.indexOf(this.searchState) !== -1)
            });
        }, 300);
    }
}
