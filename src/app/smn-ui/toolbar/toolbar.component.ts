import {Component, AfterViewInit, ViewEncapsulation, ElementRef} from '@angular/core';

import {UiWindowRef} from '../utils/providers/window.provider';
import {UiElement} from '../utils/providers/element.provider';

@Component({
    selector: 'ui-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiToolbarComponent implements AfterViewInit {

    constructor(private element: ElementRef) {
        UiElement.on(UiWindowRef.nativeWindow, 'scroll resize', (e) => {
            if (this.element.nativeElement.classList.contains('elevate-on-scroll')) {
                const header = this.element.nativeElement.querySelectorAll('header')[0];
                const scroll = UiWindowRef.nativeWindow.scrollY * 3.6;

                if (this.element.nativeElement.classList.contains('size-2x')) {
                    if (e.type === 'scroll' && scroll < 97) {
                        this.element.nativeElement.classList.add('notransition');
                        header.style.paddingBottom = (102 - scroll) + 'px';
                        header.style.height = (162 - (scroll)) + 'px';
                        setTimeout(() => {
                            this.element.nativeElement.classList.remove('notransition');
                        }, 500);
                    } else {
                        header.style.paddingBottom = '';
                        header.style.height = '';
                    }

                    if (scroll > 97) {
                        header.style.zIndex = 3;
                        this.element.nativeElement.classList.add('scrolled');
                    } else {
                        header.style.zIndex = 2;
                        this.element.nativeElement.classList.remove('scrolled');
                    }
                } else {
                    if (UiWindowRef.nativeWindow.scrollY > 1) {
                        this.element.nativeElement.classList.add('scrolled');
                    } else {
                        this.element.nativeElement.classList.remove('scrolled');
                    }
                }
            }
        });

        // let form: any = document.querySelectorAll('form');
        // if (form.length) {
        //     form = <HTMLElement>form[0];
        //     const input = form.querySelectorAll('input')[0];
        //     input.addEventListener('focus', () => {
        //         form.classList.add('open');
        //     });
        //     input.addEventListener('blur', () => {
        //         form.classList.remove('open');
        //     });
        // }
    }

    ngAfterViewInit() {
    }
}
