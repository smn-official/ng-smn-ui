import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'uiCreditCard'
})
export class UiCreditCardPipe implements PipeTransform {

    transform(value: string, args?: any) {
        if (!value) {
            return '';
        }

        value = value.toString().replace(/[^0-9]+/g, '');

        if (value.length > 4) {
            value = `${value.substring(0, 4)} ${value.substring(4)}`;
        }

        if (value.length > 9) {
            value = `${value.substring(0, 9)} ${value.substring(9)}`;
        }

        if(value.length > 14) {
            value = `${value.substring(0, 14)} ${value.substring(14)}`;
        }

        if(value.length > 19) {
            value = value.substring(0, 19);
        }

        return value;
    }
}
