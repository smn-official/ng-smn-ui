import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'uiCepNovo'
})
export class UiCepNovoPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value) {
            return '';
        }

        value = value.toString().replace(/[^a-zA-Z0-9]+/g, '');
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5);
        }
        if (value.length > 9) {
            value = value.substring(0, 9);
        }

        return value;
    }

}
