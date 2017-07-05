import {Component, Input} from '@angular/core';
import {UiSnackbar} from './snackbar.provider';

@Component({
    selector: 'ui-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
export class UiSnackbarComponent {

    @Input() bar;

    constructor() {
    }

    hide() {
        UiSnackbar.hide();
    }
}
