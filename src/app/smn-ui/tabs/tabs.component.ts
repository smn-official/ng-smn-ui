import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';

import {UiElementRef} from '../utils/providers/element-ref.provider';

@Component({
    selector: 'ui-tabs',
    templateUrl: 'tabs.component.html',
    styleUrls: ['tabs.component.scss']
})

export class UiTabsComponent implements OnInit, AfterViewInit, OnDestroy {
    showLeftArrow: boolean;
    showRightArrow: boolean;
    onScroll: any;

    constructor(private element: ElementRef) {
        this.onScroll = () => this.tabsScroll(0);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const tabs = new UiElementRef(this.element.nativeElement).querySelector('.tab');
        const indicator = new UiElementRef(this.element.nativeElement).querySelector('.indicator');

        let timeout;

        tabs.forEach(tab => {
            tab.on('click', () => {
                tabs.forEach(tab2 => {
                    if (tab2 !== tab && tab2.classList.contains('selected')) {
                        indicator.css('left', tab2.offset().left + 'px');
                        indicator.css('width', tab2.css('width'));
                        tab2.classList.remove('selected');
                    }
                });

                indicator.css('left', tab.offset().left + 'px');
                indicator.css('width', tab.css('width'));

                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    tab.classList.add('selected');
                    indicator.css('width', '');
                    indicator.css('left', '');
                }, 280);

                const overflow = new UiElementRef(this.element.nativeElement).querySelector('.overflow');

                this.tabsScroll(tab.offset().left - overflow.nativeElement.scrollLeft);
            });
        });

        setTimeout(() => {
            this.tabsScroll(0);
        });

        const windowRef = new UiElementRef(window);

        windowRef.trigger('scroll');
        windowRef.on('scroll resize', this.onScroll);
    }

    ngOnDestroy() {
        const windowRef = new UiElementRef(window);
        windowRef.off('scroll resize', this.onScroll);
    }

    tabsScroll(value?) {
        const overflow = new UiElementRef(this.element.nativeElement).querySelector('.overflow');

        let scrollLeft = overflow.nativeElement.scrollLeft;

        const maxScrollLeft = overflow.nativeElement.scrollWidth - overflow.nativeElement.clientWidth;

        if (typeof value !== 'undefined') {
            overflow.animate('borderSpacing', scrollLeft, scrollLeft + value, 280, null, (tick) => {
                overflow.nativeElement.scrollLeft = tick;

                scrollLeft = overflow.nativeElement.scrollLeft;

                this.showLeftArrow = (scrollLeft > 0);
                this.showRightArrow = (scrollLeft < maxScrollLeft);
            });
        } else {
            this.showLeftArrow = (scrollLeft > 0);
            this.showRightArrow = (scrollLeft < maxScrollLeft);
        }
    }
}
