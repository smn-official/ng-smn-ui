import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'uiTime'
})
export class UiTimePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value) {
            return '';
        }

        value = value.toString().replace(/[^0-9]+/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + ':' + value.substring(2);
        }
        if (value.length > 5) {
            value = value.substring(0, 5);
        }
        return value;
    }

}
