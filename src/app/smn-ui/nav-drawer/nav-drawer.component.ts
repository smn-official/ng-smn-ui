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

import {UiWindowRef, UiElement, UiCookie} from '../smn-ui.module';

@Component({
    selector: 'ui-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiNavDrawerComponent implements AfterViewInit, OnChanges {
    @Input() open: boolean;
    @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private element: ElementRef) {
        let currentScrollTop = UiWindowRef.nativeWindow.scrollY;

        const noscroll = () => {
            const isNavOpen = this.element.nativeElement.classList.contains('open');
            const isPersistent = this.element.nativeElement.classList.contains('persistent');

            if (isNavOpen && !isPersistent) {
                UiWindowRef.nativeWindow.scrollTo(0, currentScrollTop);
            } else {
                currentScrollTop = UiWindowRef.nativeWindow.scrollY;
            }
        };

        UiWindowRef.nativeWindow.addEventListener('scroll', noscroll);
    }

    ngAfterViewInit() {
        const body = UiElement.closest(this.element.nativeElement, 'body');
        body.style.transition = 'none';

        setTimeout(() => {
            body.style.transition = '';
            this.element.nativeElement.querySelectorAll('.ui-nav-drawer-overlay')[0].style.visibility = 'visible';
        }, 300);

        const isPersistent = this.element.nativeElement.classList.contains('persistent');
        const isOpen = this.element.nativeElement.classList.contains('open');
        if (isPersistent && isOpen) {
            body.classList.add('ui-nav-drawer-persistent');
        } else {
            body.classList.remove('ui-nav-drawer-persistent');
        }

        this.element.nativeElement.addEventListener('click', (e) => {
            if (!isPersistent && UiElement.is(e.srcElement, 'a')) {
                this.open = false;
                this.openChange.emit(this.open);
            }
        });

        if (this.open) {
            this.element.nativeElement.classList.add('open');
        } else {
            this.element.nativeElement.classList.remove('open');
        }
    }

    ngOnChanges(changes) {
        const isNavDrawerPersistent = UiCookie.get('NavDrawerPersistent') === 'true';

        if (isNavDrawerPersistent) {
            this.open = true;
            this.element.nativeElement.classList.add('open');
        }

        if (changes.open) {
            const isOpen = changes.open.currentValue;

            if (isOpen) {
                this.element.nativeElement.classList.add('open');
            } else {
                this.element.nativeElement.classList.remove('open');
            }

            const isPersistent = this.element.nativeElement.classList.contains('persistent');
            const body = UiElement.closest(this.element.nativeElement, 'body');

            if (isPersistent && isOpen) {
                body.classList.add('ui-nav-drawer-persistent');
                UiCookie.set('NavDrawerPersistent', 'true');
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
