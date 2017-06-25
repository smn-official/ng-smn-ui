import {Injectable, EventEmitter} from '@angular/core';
import {UiWindowRef} from '../providers/window.provider';
import {UiElement} from '../providers/element.provider';

let mailToolbar: HTMLElement;

@Injectable()
export class UiToolbarService {
    sharedValue: String;
    change: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    public get() {
        return this.sharedValue;
    }

    public set(sharedValue: String) {
        this.sharedValue = sharedValue;

        this.change.emit(sharedValue);
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
            UiElement.trigger(UiWindowRef.nativeWindow, 'scroll');
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

        UiElement.trigger(UiWindowRef.nativeWindow, 'scroll');
    }

    public activateTransparentToolbar(auxiliarClass?: string) {
        this.getMainToolbar().classList.add('transparent');
        if (auxiliarClass) {
            this.getMainToolbar().classList.add(auxiliarClass);
        }
    }

    public deactivateTransparentToolbar(auxiliarClass?: string) {
        this.getMainToolbar().classList.remove('transparent');
        if (auxiliarClass) {
            this.getMainToolbar().classList.remove(auxiliarClass);
        }
    }
}
