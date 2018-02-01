import {Injectable} from '@angular/core';
import {UiTimePickerDirective} from './time-picker.directive';
import {UiWindowRef} from '../utils/providers/window.provider';
import {UiElement} from '../utils/providers/element.provider';

@Injectable()
export class UiTimePickerService {

    timePickers: any = {};

    constructor() {
    }

    add(name: string, component: UiTimePickerDirective): void {
        if (this.timePickers && this.timePickers[name]) {
            return;
        }

        this.timePickers[name] = component;
    }

    get(name: string): UiTimePickerDirective {
        return this.timePickers[name];
    }

    remove(name: string) {
        delete this.timePickers[name];
    }

    closeAll() {
        UiElement.trigger(UiWindowRef.nativeWindow, 'click');
    }

    getAll(): UiTimePickerDirective {
        return this.timePickers;
    }

    updateModel(name, value) {
        this.timePickers[name].ngModel = value;
        this.timePickers[name].ngModelChange.emit(value);
    }

}
