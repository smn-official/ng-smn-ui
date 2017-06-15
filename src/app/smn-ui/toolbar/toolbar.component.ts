import {Component, AfterViewInit, ViewEncapsulation, ElementRef} from '@angular/core';
import {WindowRef} from '../providers/window.provider';
import {UiElement} from '../providers/element.provider';

@Component({
    selector: 'ui-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiToolbarComponent implements AfterViewInit {

    constructor(private element: ElementRef) {
        UiElement.on(WindowRef.nativeWindow, 'scroll resize', () => {
            this.element.nativeElement.classList.remove('scrolled');
            if (this.element.nativeElement.classList.contains('elevate-on-scroll') && WindowRef.nativeWindow.scrollY > 1) {
                this.element.nativeElement.classList.add('scrolled');
            }
        });
    }

    ngAfterViewInit() {
    }
}
