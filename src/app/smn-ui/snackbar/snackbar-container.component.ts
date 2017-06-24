import {Component} from '@angular/core';
import {UiSnackbarService} from './snackbar.service';

@Component({
    selector: 'ui-snackbar-container',
    templateUrl: './snackbar-container.component.html',
    styleUrls: ['./snackbar-container.component.scss']
})
export class UiSnackbarContainerComponent {

    bars: any[];

    constructor(snackbarService: UiSnackbarService) {
        snackbarService.barsChange.subscribe((value) => {
            this.bars = value;
        });
    }

}
