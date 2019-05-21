import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-chosen',
    templateUrl: './demo-chosen.component.html',
    styleUrls: ['./demo-chosen.component.scss']
})
export class DemoChosenComponent implements OnInit {

    simple: any;
    fruits: any;
    vegetables: any;
    required: boolean;

    constructor() {
        this.fruits = [];

        setTimeout(() => {
            for (let i = 0; i < 1; i++) {
                this.fruits = [...this.fruits, ...[{
                    id: 1,
                    name: 'Orange'
                }, {
                    id: 2,
                    name: 'Strawberry'
                }, {
                    id: 3,
                    name: 'Lemon'
                }, {
                    id: 4,
                    name: 'Banana'
                }, {
                    id: 5,
                    name: 'Apple'
                }]];

            }

            this.vegetables = [{
                id: 6,
                name: 'Lettuce'
            }, {
                id: 7,
                name: 'Argula'
            }];
        }, 500);
    }

    ngOnInit() {
        this.required = true;
        this.simple = '1';
        this.simple = 7;

        setTimeout(() => {
            this.required = false;
            this.fruits[0].name = 'Updated from component';
        }, 5000)
    }

}
