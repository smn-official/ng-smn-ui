import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ui-chosen-group',
    templateUrl: './chosen-group.component.html',
    styleUrls: ['./chosen-group.component.scss']
})
export class UiChosenGroupComponent implements OnInit {

    @Input() label: string;

    constructor() {
    }

    ngOnInit() {
    }

}
