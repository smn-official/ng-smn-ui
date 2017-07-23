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
            touchXMovement = touchXStartPosition - e.touches[0].pageX;
            touchYMovement = touchYStartPosition - e.touches[0].pageY;

            if (!firstMovementCoord) {
                if (touchXMovement) {
                    firstMovementCoord = 'X';
                } else if (touchYMovement) {
                    firstMovementCoord = 'Y';
                }
            }

            if (touchXMovement && firstMovementCoord === 'X') {
                document.body.style.overflowY = 'hidden';
                document.querySelector('html').style.overflowY = 'hidden';

                const i = currentBannerIndex;

                const isNegative = i > 0 ? -1 : 1;
                const currentPosition = (i * 100) * isNegative;

                this.element.nativeElement.querySelectorAll('.page-container .page').forEach(page => {
                    newPosition = currentPosition - ((100 / page.clientWidth) * touchXMovement);
                    page.style.transform = `translate(${newPosition}%)`;
                });
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
            document.body.style.overflowY = '';
            document.querySelector('html').style.overflowY = '';
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
