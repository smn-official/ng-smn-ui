import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'uiPhone'
})
export class UiPhonePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value) {
            return '';
        }

        value = value.toString().replace(/[^0-9]+/g, '');
        if (value.length > 0) {
            value = '(' + value;
        }
        if (value.length > 3) {
            value = value.substring(0, 3) + ') ' + value.substring(3);
        }
        if (value.length > 9 && value.length < 14) {
            value = value.substring(0, 9) + '-' + value.substring(9);
        } else if (value.length > 13) {
            value = value.substring(0, 10) + '-' + value.substring(10);
        }
        if (value.length > 15) {
            value = value.substring(0, 15);
        }

        return value;
    }

}
