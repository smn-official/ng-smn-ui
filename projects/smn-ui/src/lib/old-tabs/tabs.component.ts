import {
    AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit
} from '@angular/core';

import {UiElement} from '../utils/providers/element.provider';

@Component({
    selector: 'ui-tabs',
    templateUrl: 'tabs.component.html',
    styleUrls: ['tabs.component.scss']
})
/**/
export class UiTabsComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    showLeftArrow: boolean;
    showRightArrow: boolean;
    onScroll;
    @Input('infinite-load') infiniteLoad;
    @Input() watch;
    @Input() disabled;

    constructor(private element: ElementRef) {
        this.onScroll = () => this.tabsScroll(0);
        this.disabled = [];
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const tabs = this.element.nativeElement.querySelectorAll('.tab');
        const indicator = this.element.nativeElement.querySelector('.indicator');

        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].classList.contains('disabled')) {
                tabs[i].classList.remove('disabled');
            }
        }

        for (let i = 0; i < this.disabled.length; i++) {
            tabs[this.disabled[i]].classList.add('disabled');
        }

        const self = this;

        let timeout;

        function scrollToTab(tab, withoutAnimation?) {
            for (let i = 0; i < tabs.length; i++) {
                const tab2 = tabs[i];
                if (tab2 !== tab && tab2.classList.contains('selected')) {
                    UiElement.css(indicator, 'left', UiElement.offset(tab2).left + 'px');
                    UiElement.css(indicator, 'width', tab2.offsetWidth + 'px');
                    tab2.classList.remove('selected');
                }
            }

            UiElement.css(indicator, 'left', UiElement.offset(tab).left + 'px');
            UiElement.css(indicator, 'width', tab.offsetWidth + 'px');

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                tab.classList.add('selected');
                UiElement.css(indicator, 'width', '');
                UiElement.css(indicator, 'left', '');
            }, 280);

            const overflow = self.element.nativeElement.querySelector('.overflow');

            self.tabsScroll(UiElement.offset(tab).left - overflow.scrollLeft, withoutAnimation);
        }

        for (let i = 0; i < tabs.length; i++) {
            const tab = tabs[i];
            this.element.nativeElement.addEventListener('click', (e) => {
                if (e.target === tab && !e.target.classList.contains('disabled')) {
                    scrollToTab(tab);
                }
            });
        }

        const tabSelected = this.element.nativeElement.querySelector('.tab.first-selected');
        if (tabSelected) {
            scrollToTab(tabSelected, true);
            // tabSelected.nativeElement.click();
        }

        UiElement.trigger(window, 'scroll');
        UiElement.on(window, 'scroll resize', this.onScroll);
    }

    ngOnChanges(changes) {
        setTimeout(() => {
            this.ngAfterViewInit();
        });
    }

    ngOnDestroy() {
        UiElement.off(window, 'scroll resize', this.onScroll);
    }

    tabsScroll(value?, withoutAnimation?) {
        const overflow = this.element.nativeElement.querySelector('.overflow');

        let scrollLeft = overflow.scrollLeft;

        const maxScrollLeft = overflow.scrollWidth - overflow.clientWidth;

        if (typeof value !== 'undefined') {
            UiElement.animate(overflow, 'borderSpacing', scrollLeft, scrollLeft + value, withoutAnimation ? 1 : 280, null, (tick) => {
                overflow.scrollLeft = tick;

                scrollLeft = overflow.scrollLeft;

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
