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

    public activateExtendedToolbar() {
        this.getMainToolbar().classList.add('size-2x');

        const header = this.getMainToolbar().querySelectorAll('header')[0];
        header.style.transition = 'all 280ms';
        setTimeout(() => {
            header.style.transition = '';
        }, 280);
    }

    public deactivateExtendedToolbar() {
        this.getMainToolbar().classList.remove('size-2x');
        this.getMainToolbar().classList.remove('scrolled');

        const header = this.getMainToolbar().querySelectorAll('header')[0];
        header.style.transition = 'all 280ms';
        header.style.height = '';
        header.style.paddingBottom = '';
        setTimeout(() => {
            header.style.transition = '';
        }, 280);
    }
}
