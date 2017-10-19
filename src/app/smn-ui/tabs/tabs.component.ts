import {
    AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit
} from '@angular/core';

import {UiElementRef} from '../utils/providers/element-ref.provider';

@Component({
    selector: 'ui-tabs',
    templateUrl: 'tabs.component.html',
    styleUrls: ['tabs.component.scss']
})

export class UiTabsComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    showLeftArrow: boolean;
    showRightArrow: boolean;
    onScroll;
    @Input('infinite-load') infiniteLoad;
    @Input() watch;

    constructor(private element: ElementRef) {
        this.onScroll = () => this.tabsScroll(0);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const tabs = new UiElementRef(this.element.nativeElement).querySelector('.tab');
        const indicator = new UiElementRef(this.element.nativeElement).querySelector('.indicator');

        const self = this;

        let timeout;

        function scrollToTab(tab, withoutAnimation?) {
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

            const overflow = new UiElementRef(self.element.nativeElement).querySelector('.overflow');

            self.tabsScroll(tab.offset().left - overflow.nativeElement.scrollLeft, withoutAnimation);
        }

        tabs.forEach(tab => {
            this.element.nativeElement.addEventListener('click', (e) => {
                if (e.target === tab.nativeElement) {
                    scrollToTab(tab);
                }
            });
        });

        const tabSelected = new UiElementRef(this.element.nativeElement).querySelector('.tab.first-selected');
        if (tabSelected.length) {
            scrollToTab(tabSelected, true);
            // tabSelected.nativeElement.click();
        }

        const windowRef = new UiElementRef(window);

        windowRef.trigger('scroll');
        windowRef.on('scroll resize', this.onScroll);
    }

    ngOnChanges(changes) {
        setTimeout(() => {
            this.ngAfterViewInit();
        });
    }

    ngOnDestroy() {
        const windowRef = new UiElementRef(window);
        windowRef.off('scroll resize', this.onScroll);
    }

    tabsScroll(value?, withoutAnimation?) {
        const overflow = new UiElementRef(this.element.nativeElement).querySelector('.overflow');

        let scrollLeft = overflow.nativeElement.scrollLeft;

        const maxScrollLeft = overflow.nativeElement.scrollWidth - overflow.nativeElement.clientWidth;

        if (typeof value !== 'undefined') {
            overflow.animate('borderSpacing', scrollLeft, scrollLeft + value, withoutAnimation ? 1 : 280, null, (tick) => {
                overflow.nativeElement.scrollLeft = tick;

                scrollLeft = overflow.nativeElement.scrollLeft;

                this.showLeftArrow = (scrollLeft > 0);
                this.showRightArrow = (scrollLeft < maxScrollLeft);
            });
        } else {
            this.showLeftArrow = (scrollLeft > 0);
            this.showRightArrow = (scrollLeft < maxScrollLeft);
        }

        if (!this.showRightArrow) {
            if (this.infiniteLoad) {
                this.infiniteLoad();
            }
        }
    }
}
