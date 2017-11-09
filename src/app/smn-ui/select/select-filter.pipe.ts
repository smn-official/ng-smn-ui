import {Pipe, PipeTransform} from '@angular/core';
import {unaccent} from '../utils/functions/unaccent';

@Pipe({
    name: 'selectFilter',
    pure: false
})
export class UiSelectFilterPipe implements PipeTransform {
    transform(value, filterBy, name) {
        filterBy = filterBy ? unaccent(filterBy.toLowerCase()) : null;
        return filterBy ? value.filter(item =>
            unaccent(item[name].toLowerCase()).indexOf(filterBy) !== -1) : value;
    }
}
