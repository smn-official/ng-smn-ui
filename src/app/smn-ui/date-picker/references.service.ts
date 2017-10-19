import {Injectable} from '@angular/core';
import {UiDatePickerDirective} from './date-picker.directive';
import {UiWindowRef} from '../utils/providers/window.provider';
import {UiElement} from '../utils/providers/element.provider';

@Injectable()
export class UiReferencesService {

    datePickers: any = {};

    constructor() {
    }

    add(name: string, component: UiDatePickerDirective): void {
        if (this.datePickers && this.datePickers[name]) {
            return;
        }

        this.datePickers[name] = component;
    }

    get(name: string): UiDatePickerDirective {
        return this.datePickers[name];
    }

    remove(name: string) {
        delete this.datePickers[name];
    }

    closeAll() {
        UiElement.trigger(UiWindowRef.nativeWindow, 'click');
    }

    getAll(): UiDatePickerDirective {
        return this.datePickers;
    }

    updateModel(name, value) {
        this.datePickers[name].ngModel = value;
        this.datePickers[name].ngModelChange.emit(value);
    }

}
