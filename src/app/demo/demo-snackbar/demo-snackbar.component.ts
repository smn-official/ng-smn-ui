import {Component, OnInit} from '@angular/core';
import {UiSnackbar} from '../../smn-ui/snackbar/snackbar.provider';

@Component({
    selector: 'ui-demo-snackbar',
    templateUrl: './demo-snackbar.component.html',
    styleUrls: ['./demo-snackbar.component.scss']
})
export class DemoSnackbarComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {


            // UiSnackbar.show({
            //     text: 'Usuário cadastrado com sucesso',
            //     textAction: 'Ok',
            //     action: () => {
            //         console.log('Exec action');
            //     },
            //     delay: 9999999999
            // });
        }, 500);
    }

    showSnack(center) {
        UiSnackbar.show({
            text: 'SMN UI compilado com sucesso',
            center
        });
    }

    showSnackWithAction() {
        UiSnackbar.show({
            text: 'Vou demorar 7s para sair da tela, click no botão para me fechar',
            textAction: 'Fechar',
            action: () => {
                alert('Exec action');
            },
            delay: 7000
        });
    }

    closeSnack() {
        UiSnackbar.hide();
    }

}
