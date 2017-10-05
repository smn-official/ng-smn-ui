import {Pipe, PipeTransform} from '@angular/core';
import {unnacent} from '../utils/functions/unnacent';

@Pipe({
    name: 'selectFilter',
    pure: false
})
export class UiSelectFilterPipe implements PipeTransform {
    transform(value, filterBy, name) {
        filterBy = filterBy ? unnacent(filterBy.toLowerCase()) : null;
        return filterBy ? value.filter(item =>
            unnacent(item[name].toLowerCase()).indexOf(filterBy) !== -1) : value;
    }
}
