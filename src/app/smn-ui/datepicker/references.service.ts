import {Injectable} from '@angular/core';
import {UiDatepickerDirective} from './datepicker.directive';
import {UiWindowRef} from "../providers/window.provider";
import {UiElement} from "../providers/element.provider";

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

    remove(name: string) {
        delete this.datePickers[name];
    }

    closeAll() {
        UiElement.trigger(UiWindowRef.nativeWindow, 'click');
    }

    getAll(): UiDatepickerDirective {
        return this.datePickers;
    }

    updateModel(name, value) {
        this.datePickers[name].ngModel = value;
        this.datePickers[name].ngModelChange.emit(value);
    }

}
