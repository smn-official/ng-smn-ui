import {Injectable, EventEmitter} from '@angular/core';
import {UiWindowRef} from '../utils/providers/window.provider';
import {UiElement} from '../utils/providers/element.provider';

let mainToolbar: HTMLElement;
let defaultBreakpoint: any;

const sizes: any[] = [480, 600, 840, 960, 1280, 1440, 1600];

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
        mainToolbar = <HTMLElement>element;
        defaultBreakpoint = [];
        sizes.forEach(size => {
            if (mainToolbar.classList.contains(`elevate-on-s${size}`)) {
                defaultBreakpoint.push(size);
            }
        });
    }

    public getMainToolbar(): HTMLElement {
        if (!mainToolbar) {
            console.error('Você não registrou um toolbar principal.');
        } else {
            return mainToolbar;
        }
    }

    public activateExtendedToolbar(breakpoint?: any) {
        if (breakpoint) {
            if (!sizes.includes(breakpoint)) {
                console.error(`O tamanho do "breakpoint" tem que ser um dos tamanhos suportados: ${sizes.join(', ')}`);
            } else {
                sizes.forEach(size => this.getMainToolbar().classList.remove(`elevate-on-s${size}`));
                this.getMainToolbar().classList.add(`elevate-on-s${breakpoint}`);
            }
        }

        this.getMainToolbar().classList.add('size-2x');

        const header = this.getMainToolbar().querySelectorAll('header')[0];
        header.style.transition = 'all 280ms';
        setTimeout(() => {
            header.style.transition = '';
            UiElement.trigger(UiWindowRef.nativeWindow, 'scroll');
        }, 280);
    }

    public deactivateExtendedToolbar() {
        sizes.forEach(size => this.getMainToolbar().classList.remove(`elevate-on-s${size}`));
        defaultBreakpoint.forEach(size => this.getMainToolbar().classList.add(`elevate-on-s${size}`));

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

    public activateElevatingToolbar(auxiliarClass?: string) {
        this.getMainToolbar().classList.add('elevate-on-scroll');
        if (auxiliarClass) {
            this.getMainToolbar().classList.add(auxiliarClass);
        }
    }

    public deactivateElevatingToolbar(auxiliarClass?: string) {
        this.getMainToolbar().classList.remove('elevate-on-scroll');
        if (auxiliarClass) {
            this.getMainToolbar().classList.remove(auxiliarClass);
        }
    }
}
