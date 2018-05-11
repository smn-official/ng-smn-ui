import {
    Component,
    AfterViewInit,
    ViewEncapsulation,
    Output,
    EventEmitter,
    ElementRef,
    OnChanges,
    Input, OnDestroy
} from '@angular/core';

import { UiElement } from '../utils/providers/element.provider';
import { UiCookie } from '../utils/providers/cookie.provider';
import { UiElementRef } from '../utils/providers/element-ref.provider';

@Component({
    selector: 'ui-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiNavDrawerComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input() open: boolean;
    @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    public openNav: Function;
    public closeNav: Function;

    constructor(private element: ElementRef) {
        this.openNav = () => {
            if (document.body.clientWidth <= 375 || (!this.element.nativeElement.classList.contains('persistent') && window.scrollY > 1)) {
                const fabContainer = document.querySelectorAll('.ui-fab-container')[0];
                if (fabContainer) {
                    fabContainer.classList.add('hide');
                }
            }
            this.element.nativeElement.classList.add('open');
            if (!this.element.nativeElement.classList.contains('persistent')) {
                document.body.style.overflowY = 'hidden';
            } else {
                document.body.style.overflowY = '';
            }
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
            if (!(isPersistent && window.innerWidth > 763) && UiElement.is(e.srcElement, 'a')) {
                this.open = false;
                this.openChange.emit(this.open);
            }
        });

        if (this.open) {
            this.openNav();
        } else {
            this.closeNav();
        }

        const navDrawer = this.element.nativeElement.querySelector('nav');

        let navDrawerTouch;
        let mouseX;
        let mouseXMovement;

        UiElement.on(window, 'touchstart', (e) => {
            mouseX = e.touches[0].pageX;
            navDrawerTouch = (mouseX > 0 && mouseX < 40) ? 'open' : navDrawerTouch;
            navDrawerTouch = (mouseX > 320 && mouseX < 360) ? 'close' : navDrawerTouch;
        });

        UiElement.on(window, 'touchmove', (e) => {
            if (navDrawerTouch) {
                mouseXMovement = e.touches[0].pageX - mouseX;
                if (navDrawerTouch === 'open' && !this.open) {
                    mouseXMovement = mouseXMovement > 320 ? 320 : mouseXMovement;
                    UiElement.css(navDrawer, 'transform', 'translateX(' + (-320 + mouseXMovement) + 'px)');
                } else if (navDrawerTouch === 'close' && this.open) {
                    mouseXMovement = mouseXMovement < -330 ? -330 : mouseXMovement;
                    mouseXMovement = mouseXMovement > 0 ? 0 : mouseXMovement;
                    UiElement.css(navDrawer, 'transform', 'translateX(' + (mouseXMovement) + 'px)');
                }
            }
        });

        UiElement.on(window, 'touchend', () => {
            if (navDrawerTouch) {
                if (navDrawerTouch === 'open' && mouseXMovement > 20) {
                    UiElement.css(navDrawer, 'transform', '');
                    this.open = true;
                    this.openChange.emit(this.open);
                    this.openNav();
                } else if (navDrawerTouch === 'close' && mouseXMovement < -20) {
                    UiElement.css(navDrawer, 'transform', '');
                    this.open = false;
                    this.openChange.emit(this.open);
                    this.closeNav();
                } else {
                    UiElement.css(navDrawer, 'transform', '');
                }
            }

            navDrawerTouch = undefined;
        });
    }

    ngOnChanges(changes) {
        const isNavDrawerPersistent = UiCookie.get('NavDrawerPersistent') === 'true';

        if (isNavDrawerPersistent) {
            this.open = true;
            this.openNav();
        }

        if (changes.open) {
            const isOpen = changes.open.currentValue;
            this.open = isOpen;

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

            setTimeout(() => {
                UiElement.trigger(window, 'resize');
            }, 280);
        }
    }

    ngOnDestroy() {
        document.body.classList.add('notransition');
        document.body.classList.remove('ui-nav-drawer-persistent');
        setTimeout(() => {
            document.body.classList.remove('notransition');
        }, 1);
    }

    closeMenuOverlay() {
        if (this.open !== undefined) {
            this.open = false;
            this.openChange.emit(this.open);
        }
    }
}
