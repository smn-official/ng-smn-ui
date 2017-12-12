import {AfterViewInit, Component} from '@angular/core';
import {UiSnackbar} from './snackbar.provider';
import {UiElement} from '../utils/providers/element.provider';

@Component({
    selector: 'ui-snackbar-container',
    templateUrl: './snackbar-container.component.html',
    styleUrls: ['./snackbar-container.component.scss']
})
export class UiSnackbarContainerComponent implements AfterViewInit {

    bars: any[];

    constructor() {
        UiSnackbar.barsChange.subscribe((value) => {
            this.bars = value;
        });
    }

    ngAfterViewInit() {
        UiElement.on(window, 'resize', () => {
            if (this.bars && this.bars.length) {
                UiSnackbar.elevateFAB();
            }
        });
    }

}
