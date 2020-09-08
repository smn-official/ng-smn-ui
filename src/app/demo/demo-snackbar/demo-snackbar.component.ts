import {Component, OnInit} from '@angular/core';
import {UiSnackbar} from '../../../../projects/smn-ui/src/lib/snackbar/snackbar.provider';

@Component({
    selector: 'ui-demo-snackbar',
    templateUrl: './demo-snackbar.component.html',
    styleUrls: ['./demo-snackbar.component.scss']
})
export class DemoSnackbarComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    showSnack(center?) {
        UiSnackbar.hide();
        UiSnackbar.show({
            text: 'SMN UI compilado com sucesso',
            center
        });
    }

    showSnackInfinity() {
        UiSnackbar.show({
            text: 'SMN UI compilado com sucesso',
            duration: Infinity,
            actionText: 'Fechar',
            action: (close) => {
                close();
            },
        });
    }

    showSnackWithAction() {
        UiSnackbar.show({
            text: 'Vou demorar 7s para sair da tela, click no botão para me fechar',
            actionText: 'Fechar',
            action: (close) => {
                close();
                alert('Exec action');
            },
            duration: 7000
        });
    }

    closeSnack() {
        UiSnackbar.hide();
    }

}
