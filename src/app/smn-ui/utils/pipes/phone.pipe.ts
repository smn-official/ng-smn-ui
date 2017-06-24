import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'uiPhone'
})
export class UiPhonePipe implements PipeTransform {
    transform(value: any, ddd?: any): any {
        if (!value) {
            return '';
        }
        value = value.toString().replace(/[^0-9]+/g, '');
        if (value.length > 4 && value.length < 9) {
            value = value.substring(0, 4) + '-' + value.substring(4);
        } else if (value.length > 8) {
            value = value.substring(0, 5) + '-' + value.substring(5);
        }
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        if (ddd) {
            value = `(${ddd}) ${value}`;
        }
        return value;
    }
}
