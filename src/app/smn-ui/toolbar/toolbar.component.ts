import {Component, AfterViewInit, ViewEncapsulation, ElementRef} from '@angular/core';

import {UiWindowRef} from '../providers/window.provider';
import {UiElement} from '../providers/element.provider';

@Component({
    selector: 'ui-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiToolbarComponent implements AfterViewInit {

    constructor(private element: ElementRef) {
        UiElement.on(UiWindowRef.nativeWindow, 'scroll resize', () => {
            if (this.element.nativeElement.classList.contains('elevate-on-scroll')) {
                const header = this.element.nativeElement.querySelectorAll('header')[0];
                const scroll = UiWindowRef.nativeWindow.scrollY * 3.4;

                if (scroll < 97) {
                    header.style.paddingBottom = (102 - scroll) + 'px';
                    header.style.height = (162 - (scroll)) + 'px';

                    this.element.nativeElement.classList.remove('scrolled');
                    header.style.zIndex = 1;
                } else {
                    header.style.paddingBottom = '';
                    header.style.height = '';

                    this.element.nativeElement.classList.add('scrolled');
                    header.style.zIndex = 2;
                }
            }
        });
    }

    ngAfterViewInit() {
    }
}
/**/
