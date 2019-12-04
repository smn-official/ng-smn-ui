import { Pipe, PipeTransform } from '@angular/core';

interface UiCurrencyPipeArgs {
    noNegative?: boolean;
}

@Pipe({
    name: 'uiCurrency'
})
export class UiCurrencyPipe implements PipeTransform {

    transform(value: any, args?: UiCurrencyPipeArgs): any {
        if (!value && typeof value !== 'number') {
            return '';
        }
        if (typeof value === 'number') {
            value = value.toFixed(2);
        }

        const isNegative = !(value.toString().match(/[+]/) || !value.toString().match(/[-]/));

        // Verifica se há valor no model (permite remover o '0,00')
        const noValue = value.length === 3 && value.replace(',', '').split('').every(n => n === '0');

        // Removendo o que não é dígito qualquer zero adicional no começo da string
        value = value.toString().replace(/[^0-9]+/g, '').replace(/^0+/g, '');

        // Adiciona os zeros necessários à esquerda devido a formatação de dinheiro, caso haja valor na model
        if (!noValue) {
            while (value.length < 3) {
                value = '0' + value.toString();
            }
        }


        let newCurrency = '';
        value = value.split('');
        for (let i = 0; i < value.length; i++) {
            const valueChar = value[value.length - 1 - i];
            if (i === 2) {
                newCurrency = ',' + newCurrency;
            } else if (i > 3 && !((i - 2) % 3)) {
                newCurrency = '.' + newCurrency;
            }
            newCurrency = valueChar + newCurrency;
        }

        // ADICIONANDO O SINAL NEGATIVO
        if (args && args.noNegative) {
            return newCurrency;
        }

        return isNegative ? '-' + newCurrency : newCurrency;
    }

}
