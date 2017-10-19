import {Pipe, PipeTransform} from '@angular/core';
import {unnacent} from '../functions/unnacent';

@Pipe({
    name: 'uiFilter',
    pure: false
})
export class UiFilterPipe implements PipeTransform {
    transform(value, filterBy, name) {
        filterBy = filterBy ? unnacent(filterBy.toLowerCase()) : null;
        return filterBy ? value.filter(item =>
            unnacent(item[name].toLowerCase()).indexOf(filterBy) !== -1) : value;
    }
}
