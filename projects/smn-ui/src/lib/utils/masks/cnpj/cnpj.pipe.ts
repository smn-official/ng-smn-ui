import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'uiCnpj'
})
export class UiCnpjPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value) {
            return '';
        }

        value = value.toString().replace(/[^0-9]+/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '.' + value.substring(2);
        }
        if (value.length > 6) {
            value = value.substring(0, 6) + '.' + value.substring(6);
        }
        if (value.length > 10) {
            value = value.substring(0, 10) + '/' + value.substring(10);
        }
        if (value.length > 15) {
            value = value.substring(0, 15) + '-' + value.substring(15);
        }
        if (value.length > 18) {
            value = value.substring(0, 18);
        }
        return value;
    }

}
