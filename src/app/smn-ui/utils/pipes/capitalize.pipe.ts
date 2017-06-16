import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'uiCapitalize'
})
export class UiCapitalizePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value && value.length > 0 ? value[0].toUpperCase() + value.substr(1).toLowerCase() : value;
    }

}
