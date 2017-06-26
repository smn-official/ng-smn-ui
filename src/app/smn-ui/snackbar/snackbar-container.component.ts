import {Component} from '@angular/core';
import {UiSnackbar} from './snackbar.provider';

@Component({
    selector: 'ui-snackbar-container',
    templateUrl: './snackbar-container.component.html',
    styleUrls: ['./snackbar-container.component.scss']
})
export class UiSnackbarContainerComponent {

    bars: any[];

    constructor() {
        UiSnackbar.barsChange.subscribe((value) => {
            this.bars = value;
        });
    }

}
