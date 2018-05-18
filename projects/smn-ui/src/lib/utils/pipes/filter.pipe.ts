import {Pipe, PipeTransform} from '@angular/core';
import {unaccent} from '../functions/unaccent';

@Pipe({
    name: 'uiFilter',
    pure: false
})
export class UiFilterPipe implements PipeTransform {
    transform(value, filterBy, name) {
        filterBy = filterBy ? unaccent(filterBy.toLowerCase()) : null;
        return filterBy ? value.filter(item =>
            unaccent(item[name].toLowerCase()).indexOf(filterBy) !== -1) : value;
    }
}
