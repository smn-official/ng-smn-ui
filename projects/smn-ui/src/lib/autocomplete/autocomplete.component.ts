import {Component, EventEmitter} from '@angular/core';

@Component({
    selector: 'ui-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss']
})
export class UiAutocompleteComponent {
    ngModel: any;
    list: any[];
    loading: boolean;
    primary: string;
    secondary: string;
    accentClass: boolean;
    focusedIndex: number;
    selectChange: EventEmitter<any>;
    loadMore: EventEmitter<any>;

    selectItem(item) {
        this.selectChange.emit(item);
    }

    loadMoreEmit() {
        setTimeout(() => this.loadMore.emit());
    }

}
