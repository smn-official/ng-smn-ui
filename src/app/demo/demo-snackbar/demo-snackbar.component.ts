import {Component, OnInit} from '@angular/core';
import {UiSnackbarService} from '../../smn-ui/snackbar/snackbar.service';

@Component({
    selector: 'ui-demo-snackbar',
    templateUrl: './demo-snackbar.component.html',
    styleUrls: ['./demo-snackbar.component.scss']
})
export class DemoSnackbarComponent implements OnInit {

    constructor(private snackbarService: UiSnackbarService) {
    }

    ngOnInit() {
        this.snackbarService.add({
            text: 'Mário'
        });
        let counter = 0;
        setInterval(() => {
            counter++;

            this.snackbarService.add({
                text: 'Interval ' + counter,
                textAction: 'Ok',
                center: true,
                action: () => {
                    console.log(counter);
                },
                delay: 20000
            });
        }, 4500);
    }

}
