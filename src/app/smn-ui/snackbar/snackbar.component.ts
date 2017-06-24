import {Component, Input, OnInit} from '@angular/core';
import {UiSnackbarService} from './snackbar.service';

@Component({
    selector: 'ui-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
export class UiSnackbarComponent implements OnInit {

    @Input() bar;

    constructor(private snackbarService: UiSnackbarService) {
    }

    ngOnInit() {
    }

    hide() {
        this.snackbarService.hide();
    }
}
