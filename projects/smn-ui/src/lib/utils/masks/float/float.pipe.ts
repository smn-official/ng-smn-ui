import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'uiFloat'
})
export class UiFloatPipe implements PipeTransform {

    transform(value: any, decimal: number = null): any {
        if (!value && typeof value !== 'number') {
            return '';
        }

        if (!decimal || isNaN(decimal)) {
            const decimals = value.toString().split('.');
            decimal = decimals.length > 1 ? decimals[1].length : 0;
        }

        if (typeof value === 'number') {
            value = value.toFixed(decimal);
        }

        const isNegative = !(value.toString().match(/[+]/) || !value.toString().match(/[-]/));

        // Verifica se há valor no model (permite remover o '0,00')
        const noValue = decimal && value.length === (decimal + 1) && value.replace(',', '').split('').every(n => n === '0');

        // Removendo o que não é dígito qualquer zero adicional no começo da string
        value = value.toString().replace(/[^0-9]+/g, '').replace(/^0+/g, '');

        // Adiciona os zeros necessários à esquerda, caso haja valor na model
        if (!noValue) {
            while (value.length < (decimal + 1)) {
                value = '0' + value.toString();
            }
        }

        let newValue = '';
        value = value.split('');
        for (let i = 0; i < value.length; i++) {
            const valueChar = value[value.length - 1 - i];
            if (decimal && i === decimal) {
                newValue = ',' + newValue;
            } else if (
                i > decimal &&
                !((i - decimal) % 3)
            ) {
                newValue = '.' + newValue;
            }
            newValue = valueChar + newValue;
        }

        // ADICIONANDO O SINAL NEGATIVO
        newValue = isNegative ? '-' + newValue : newValue;

        return newValue;
    }
}
