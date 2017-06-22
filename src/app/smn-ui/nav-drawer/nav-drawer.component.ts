import {
    Component,
    AfterViewInit,
    ViewEncapsulation,
    Output,
    EventEmitter,
    ElementRef,
    OnChanges,
    Input
} from '@angular/core';

import {UiWindowRef} from '../providers/window.provider';
import {UiElement} from '../providers/element.provider';
import {UiCookie} from '../providers/cookie.provider';

@Component({
    selector: 'ui-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiNavDrawerComponent implements AfterViewInit, OnChanges {
    @Input() open: boolean;
    @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    public openNav: Function;
    public closeNav: Function;

    constructor(private element: ElementRef) {
        this.openNav = () => {
            if (document.body.clientWidth <= 375 || (!this.element.nativeElement.classList.contains('persistent') && UiWindowRef.nativeWindow.scrollY > 1)) {
                const fabContainer = document.querySelectorAll('.ui-fab-container')[0];
                if (fabContainer) {
                    fabContainer.classList.add('hide');
                }
            }
            this.element.nativeElement.classList.add('open');
            document.body.style.overflowY = 'hidden';
        };

        this.closeNav = () => {
            const fabContainer = document.querySelectorAll('.ui-fab-container')[0];
            if (fabContainer) {
                fabContainer.classList.remove('hide');
            }
            this.element.nativeElement.classList.remove('open');
            document.body.style.overflowY = '';
        };
    }

    ngAfterViewInit() {
        const body = UiElement.closest(this.element.nativeElement, 'body');
        body.classList.add('notransition');

        setTimeout(() => {
            body.classList.remove('notransition');
            this.element.nativeElement.querySelectorAll('.ui-nav-drawer-overlay')[0].style.visibility = 'visible';
        }, 300);

        const isPersistent = this.element.nativeElement.classList.contains('persistent');
        const isOpen = this.element.nativeElement.classList.contains('open');
        if (isPersistent && isOpen) {
            if (document.body.clientWidth > 375) {
                body.classList.add('ui-nav-drawer-persistent');
            }
        } else {
            body.classList.remove('ui-nav-drawer-persistent');
        }

        this.element.nativeElement.addEventListener('click', (e) => {
            if (!(isPersistent && document.body.clientWidth > 375) && UiElement.is(e.srcElement, 'a')) {
                this.open = false;
                this.openChange.emit(this.open);
            }
        });

        if (this.open) {
            this.openNav();
        } else {
            this.closeNav();
        }
    }

    ngOnChanges(changes) {
        const isNavDrawerPersistent = UiCookie.get('NavDrawerPersistent') === 'true';

        if (isNavDrawerPersistent) {
            this.open = true;
            this.openNav();
        }

        if (changes.open) {
            const isOpen = changes.open.currentValue;

            if (isOpen) {
                this.openNav();
            } else {
                this.closeNav();
            }

            const isPersistent = this.element.nativeElement.classList.contains('persistent');
            const body = UiElement.closest(this.element.nativeElement, 'body');

            if (isPersistent && isOpen) {
                if (document.body.clientWidth > 375) {
                    body.classList.add('ui-nav-drawer-persistent');
                    UiCookie.set('NavDrawerPersistent', 'true');
                }
            } else {
                body.classList.remove('ui-nav-drawer-persistent');
                UiCookie.set('NavDrawerPersistent', 'false');
            }
        }
    }

    closeMenuOverlay() {
        if (this.open !== undefined) {
            this.open = false;
            this.openChange.emit(this.open);
        }
    }
}
