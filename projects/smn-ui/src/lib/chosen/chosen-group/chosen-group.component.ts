import {Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {UiChosenOptionComponent} from '../chosen-option/chosen-option.component';

@Component({
    selector: 'ui-chosen-group',
    templateUrl: './chosen-group.component.html',
    styleUrls: ['./chosen-group.component.scss']
})
export class UiChosenGroupComponent implements OnInit {

    @Input() label: string;

    @ContentChildren(UiChosenOptionComponent) options: QueryList<UiChosenOptionComponent>;

    hidden: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
