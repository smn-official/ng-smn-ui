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
    forma: string;

    constructor() {
        this.forma = 'E';
        this.fruits = [];
        setTimeout(() => {
            this.simple = 2;
        });

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
    }

    ngOnInit() {

        // this.simple = '1';
        // this.simple = 7;

        setTimeout(() => {
            this.required = true;
            this.fruits[0].name = 'Updated from component';
        })
    }

}
