import {Injectable} from '@angular/core';
import {UiDatepickerDirective} from './datepicker.directive';

@Injectable()
export class UiReferencesService {

    datePickers: any = {};

    constructor() {
    }

    add(name: string, component: UiDatepickerDirective): void {
        if (this.datePickers && this.datePickers[name]) {
            throw console.error('Error');
        }

        this.datePickers[name] = component;
    }

    get(name: string): UiDatepickerDirective {
        return this.datePickers[name];
    }

    getAll(): UiDatepickerDirective {
        return this.datePickers;
    }

    updateModel(name, value) {
        this.datePickers[name].ngModel = value;
        this.datePickers[name].ngModelChange.emit(value);
    }

}
