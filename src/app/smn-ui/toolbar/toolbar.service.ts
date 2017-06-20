import {Injectable, EventEmitter} from '@angular/core';

let mailToolbar: HTMLElement;

@Injectable()
export class UiToolbarService {
    sharedValue: String;
    titleChange: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    public getTitle() {
        return this.sharedValue;
    }

    public setTitle(sharedValue: String) {
        this.sharedValue = sharedValue;

        this.titleChange.emit(sharedValue);
    }

    public registerMainToolbar(element: any) {
        mailToolbar = <HTMLElement>element;
    }

    public getMainToolbar(): HTMLElement {
        if (!mailToolbar) {
            console.error('Você não registrou um toolbar principal.');
        } else {
            return mailToolbar;
        }
    }
}
