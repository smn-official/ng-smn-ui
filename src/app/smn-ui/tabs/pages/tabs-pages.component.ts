import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {UiElementRef} from '../../utils/providers/element-ref.provider';

@Component({
    moduleId: module.id,
    selector: 'ui-tabs-pages',
    templateUrl: 'tabs-pages.component.html',
    styleUrls: ['tabs-pages.component.scss']
})

export class UiTabsPagesComponent implements OnInit, AfterViewInit {
    @Input() tabs: any;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const tabs = new UiElementRef(this.tabs.element.nativeElement).querySelector('.tab');

        let touchXMovement;
        let touchXStartPosition;
        let touchYMovement;
        let touchYStartPosition;
        let firstMovementCoord;
        let currentBannerIndex;
        let newPosition;

        const elBannerContainer = this.element.nativeElement.querySelector('.page-container');

        elBannerContainer.addEventListener('touchstart', (e) => {
            currentBannerIndex = tabs.indexOf(tabs.filter(tab => tab.is('.selected'))[0]);
            touchXStartPosition = e.touches[0].pageX;
            touchYStartPosition = e.touches[0].pageY;
            elBannerContainer.classList.add('no-transition');
        });

        elBannerContainer.addEventListener('touchmove', (e) => {
            if (touchXStartPosition < 0 || touchXStartPosition > 40) {
                touchXMovement = touchXStartPosition - e.touches[0].pageX;
                touchYMovement = touchYStartPosition - e.touches[0].pageY;

                if (!firstMovementCoord) {
                    if (touchXMovement > 10 || touchXMovement < -10) {
                        firstMovementCoord = 'X';
                    } else if (touchYMovement > 10 || touchYMovement < -10) {
                        firstMovementCoord = 'Y';
                    }
                }

                if (touchXMovement && firstMovementCoord === 'X') {
                    disableScroll();

                    const i = currentBannerIndex;

                    const isNegative = i > 0 ? -1 : 1;
                    const currentPosition = (i * 100) * isNegative;

                    this.element.nativeElement.querySelectorAll('.page-container .page').forEach(page => {
                        newPosition = currentPosition - ((100 / page.clientWidth) * touchXMovement);
                        page.style.transform = `translate(${newPosition}%)`;
                    });
                }
            }
        });

        elBannerContainer.addEventListener('touchend', () => {
            elBannerContainer.classList.remove('no-transition');
            if (touchXMovement) {
                const newIndex = (Math.round(newPosition / 100) * -1);
                if (tabs[newIndex]) {
                    tabs[newIndex].trigger('click');
                } else {
                    this.pagesGoToPage();
                }
            }
            // document.body.style.overflowY = '';
            // document.querySelector('html').style.overflowY = '';
            enableScroll();
            firstMovementCoord = undefined;
        });
    }

    pagesGoToPage(i?) {
        i = i ? i - 1 : null;

        const tabs = new UiElementRef(this.tabs.element.nativeElement).querySelector('.tab');

        if (tabs[i]) {
            const isNegative = i > 0 ? -1 : 1;
            const newPosition = i * 100 * isNegative;

            this.element.nativeElement.querySelectorAll('.page-container .page').forEach(page => {
                page.style.transform = `translate(${newPosition}%)`;
            });
        } else {
            this.pagesGoToPage(tabs.indexOf(tabs.filter(tab => tab.is('.selected'))[0]) + 1);
        }
    }
}




// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) { // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    }
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    }
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
