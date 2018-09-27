import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {UiTabComponent} from '../tab.component';
import {UiElement} from '../../utils/providers/element.provider';

@Component({
    selector: 'ui-tab-header',
    templateUrl: './tab-header.component.html',
    styleUrls: ['./tab-header.component.scss']
})
export class UiTabHeaderComponent implements OnInit, AfterViewInit {

    tabsContainer: HTMLElement;
    inkBar: HTMLElement;
    increment: number;

    constructor(private element: ElementRef) {
        this.increment = 90;
    }

    ngOnInit() {
        this.tabsContainer = this.element.nativeElement.querySelector('.tabs-container');
        this.inkBar = this.element.nativeElement.querySelector('.ink-bar');
    }

    ngAfterViewInit() {
    }

    /**
     * Move o ink bar para a tab que está ativa
     * @param {UiTabComponent} tabRef - Referência da Tab que está ativa
     * @return {void}
     **/
    moveInkBarTo(tabRef) {
        setTimeout(() => {
            UiElement.css(this.inkBar, 'left', `${tabRef.offsetLeft}px`);
            UiElement.css(this.inkBar, 'width', `${tabRef.clientWidth}px`);
        });
    }

    /**
     * Retorna se o scroll left ja saiu da posição 0
     * @return {number}
     * */
    hasLeftScroll() {
        return this.tabsContainer.scrollLeft > 0;
    }

    /**
     * Retorna se deve exibir o control da direita
     * @return {number}
     * */
    hasRightScroll() {
        const widthWithScroll = this.tabsContainer.scrollLeft + this.tabsContainer.clientWidth;
        return widthWithScroll < this.tabsContainer.scrollWidth;
    }

    /**
     * Altera o valor do scroll
     * @param {number} value - Valor a ser incrementando ou decrementado do scroll
     * @return {void}
     **/
    updateScroll(value) {
        const scrollLeft = this.tabsContainer.scrollLeft;
        UiElement.animate(
            this.tabsContainer,
            'borderSpacing',
            scrollLeft,
            scrollLeft + value,
            280,
            null,
            (tick) => {
                this.tabsContainer.scrollLeft = tick;
            });
    }
}
