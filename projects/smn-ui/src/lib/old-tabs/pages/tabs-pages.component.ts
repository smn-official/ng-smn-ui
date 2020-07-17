import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {UiElementRef} from '../../utils/providers/element-ref.provider';
import {UiElement} from '../../utils/providers/element.provider';

@Component({
    selector: 'ui-tabs-pages',
    templateUrl: 'tabs-pages.component.html',
    styleUrls: ['tabs-pages.component.scss']
})

export class UiTabsPagesComponent implements AfterViewInit {
    @Input() tabs: any;
    firstLoad: boolean;
    currentPage: number;
    timeOutTurnBack: any;
    @Input('enable-overflow') enableOverflow: boolean;
    @Output('onchangepage') onChangePage: EventEmitter<any> = new EventEmitter();

    constructor(private element: ElementRef) {
        this.currentPage = 1;
    }

    ngAfterViewInit() {
        if (this.tabs) {
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

                if (this.enableOverflow) {
                    const pageContainer = new UiElementRef(this.element.nativeElement);

                    const pages = pageContainer.querySelector('.page-container .page');
                    for (let i = 0; i < pages.length; i++) {
                        pages[i].css('height', '');
                    }
                }
            });

            elBannerContainer.addEventListener('touchmove', (e) => {
                if (touchXStartPosition < 0 || touchXStartPosition > 40) {
                    touchXMovement = touchXStartPosition - e.touches[0].pageX;
                    touchYMovement = touchYStartPosition - e.touches[0].pageY;

                    if (!firstMovementCoord) {
                        if (touchXMovement > 20 || touchXMovement < -20) {
                            firstMovementCoord = 'X';
                        } else if (touchYMovement > 20 || touchYMovement < -20) {
                            firstMovementCoord = 'Y';
                        }
                    }

                    if (touchXMovement && firstMovementCoord === 'X') {
                        UiElement.disableScroll();

                        const i = currentBannerIndex;

                        const isNegative = i > 0 ? -1 : 1;
                        const currentPosition = (i * 100) * isNegative;

                        const pages = this.element.nativeElement.querySelectorAll('.page-container .page');
                        for (let i = 0; i < pages.length; i++) {
                            const page = pages[i];
                            newPosition = currentPosition - ((100 / page.clientWidth) * touchXMovement);
                            page.style.transform = `translate(${newPosition}%)`;
                        }
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
                UiElement.enableScroll();
                firstMovementCoord = undefined;
            });
        }

        this.pagesGoToPage(1);
    }

    pagesGoToPage(nextPage?) {
        let tabs;
        if (this.tabs) {
            tabs = new UiElementRef(this.tabs.element.nativeElement).querySelector('.tab');
        } else {
            tabs = new UiElementRef(this.element.nativeElement).querySelector('.page');
        }

        if (tabs[nextPage - 1]) {
            const isNegative = (nextPage - 1) > 0 ? -1 : 1;
            const newPosition = (nextPage - 1) * 100 * isNegative;

            const pages = this.element.nativeElement.children[0].children;
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                page.style.transform = `translate(${newPosition}%)`;

            }
        } else {
            this.pagesGoToPage(tabs.indexOf(tabs.filter(tab => tab.is('.selected'))[0]) + 1);
            // TODO: Verificar se isso realmente funciona
        }

        const pageContainer = new UiElementRef(this.element.nativeElement);
        const elNextPage = new UiElementRef(this.element.nativeElement.children[0].children[nextPage - 1]);
        const pages = this.element.nativeElement.children[0].children;
        for (let i = 0; i < pages.length; i++) {
            if (nextPage - 1 === i) {
                const pageRef = new UiElementRef(pages[i]);
                pageRef.css('height', '');
            }
        }

        if (this.firstLoad) {
            const elCurrentPage = new UiElementRef(this.element.nativeElement.children[0].children[this.currentPage - 1]);
            pageContainer.css('height', elCurrentPage.nativeElement.clientHeight + 'px');
        } else {
            this.firstLoad = true;
        }
        if (elNextPage) {
            setTimeout(() => {
                pageContainer.css('height', elNextPage.nativeElement.clientHeight + 'px');

                clearTimeout(this.timeOutTurnBack);
                this.timeOutTurnBack = setTimeout(() => {
                    pageContainer.css('height', '');

                    for (let i = 0; i < pages.length; i++) {
                        if (nextPage - 1 !== i) {
                            const pageRef = new UiElementRef(pages[i]);
                            pageRef.css('height', 0);
                        }
                    }
                }, 280);
            });
        }

        if (typeof nextPage !== 'undefined') {
            this.currentPage = nextPage;
            if (this.onChangePage) {
                setTimeout(() => {
                    this.onChangePage.emit();
                });
            }
        }
    }
}
