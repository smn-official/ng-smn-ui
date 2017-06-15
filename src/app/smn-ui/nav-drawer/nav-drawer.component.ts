import {Component, AfterViewInit, ViewEncapsulation, Output, EventEmitter, ElementRef, OnChanges, Input} from '@angular/core';

import {WindowRef} from '../providers/window.provider';
import {UiElement} from '../providers/element.provider';

@Component({
    selector: 'ui-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiNavDrawerComponent implements AfterViewInit, OnChanges {
    @Output() closeMenu: EventEmitter<any> = new EventEmitter();
    @Input() ngClass: String;

    constructor(private element: ElementRef) {
        let currentScrollTop = WindowRef.nativeWindow.scrollY;

        const $this = this;

        function noscroll() {
            console.log(WindowRef.nativeWindow);

            const isNavOpen = $this.element.nativeElement.classList.contains('open');

            if (isNavOpen) {
                WindowRef.nativeWindow.scrollTo(0, currentScrollTop);
            } else {
                currentScrollTop = WindowRef.nativeWindow.scrollY;
            }
        }

        // add listener to disable scroll
        WindowRef.nativeWindow.addEventListener('scroll', noscroll);

        /*// Remove listener to disable scroll
         WindowRef.nativeWindow.removeEventListener('scroll', noscroll);*/

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.element.nativeElement.querySelectorAll('.ui-nav-drawer-overlay')[0].style.visibility = 'visible';
        }, 300);

        const isPersistent = this.element.nativeElement.classList.contains('persistent');
        const isOpen = this.element.nativeElement.classList.contains('open');
        if (isPersistent && isOpen) {
            UiElement.closest(this.element.nativeElement, 'body').classList.add('ui-nav-drawer-persistent');
        } else {
            UiElement.closest(this.element.nativeElement, 'body').classList.remove('ui-nav-drawer-persistent');
        }

        this.element.nativeElement.addEventListener('click', (e) => {
            if (!isPersistent && UiElement.is(e.srcElement, 'a')) {
                this.closeMenu.emit();
            }
        });
    }

    ngOnChanges(changes) {
        if (changes.ngClass) {
            const isPersistent = this.element.nativeElement.classList.contains('persistent');
            const isOpen = changes.ngClass.currentValue.open;

            if (isPersistent && isOpen) {
                UiElement.closest(this.element.nativeElement, 'body').classList.add('ui-nav-drawer-persistent');
            } else {
                UiElement.closest(this.element.nativeElement, 'body').classList.remove('ui-nav-drawer-persistent');
            }
        }
    }

    closeMenuOverlay() {
        if (this.closeMenu) {
            this.closeMenu.emit();
        }
    }
}
