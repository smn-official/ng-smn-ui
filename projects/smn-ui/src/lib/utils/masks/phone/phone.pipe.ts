import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'uiPhone'
})
export class UiPhonePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value) {
            return '';
        }

        value = value.toString().replace(/[^0-9]+/g, '');

        if (args.type === '') {
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
        } else if (args.type === 'ddi') {
            if (value.length > 0) {
                value = '+' + value;
            }
            if (value.length > 3) {
                value = value.substring(0, 3) + ' (' + value.substring(3);
            }
            if (value.length > 7) {
                value = value.substring(0, 7) + ') ' + value.substring(7);
            }
            if (value.length > 12 && value.length < 18) {
                value = value.substring(0, 13) + '-' + value.substring(13);
            } else if (value.length > 17) {
                value = value.substring(0, 14) + '-' + value.substring(14);
            }
            if (value.length > 17) {
                value = value.substring(0, 19);
            }
        }

        return value;
    }

}
