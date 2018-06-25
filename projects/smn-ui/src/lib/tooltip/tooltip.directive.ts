import {AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {UiElement} from '../utils/providers/element.provider';

/**
 * TODO: Persist tooltip.
 * */
@Directive({
    selector: '[uiTooltip]'
})
export class TooltipDirective implements OnInit, AfterViewInit, OnDestroy {
    @Input() uiTooltip: string;
    @Input() top: boolean;
    @Input() left: boolean;
    @Input() right: boolean;
    @Input() bottom: boolean;

    onShow: Function;
    onHide: Function;
    wrap: HTMLElement;
    class: string;

    constructor(private element: ElementRef) {
        this.onShow = (event) => {
            this.show(event);
        };
        this.onHide = () => {
            this.hide();
        };

    }

    ngOnInit() {
        if (!this.top && !this.left && !this.right) {
            this.bottom = true;
        }
    }

    ngAfterViewInit() {
        UiElement.on(this.element.nativeElement, 'mouseenter', this.onShow);
        UiElement.on(this.element.nativeElement, 'mouseleave', this.onHide);
    }

    ngOnDestroy() {
        UiElement.off(this.element.nativeElement, 'mouseenter', this.onShow);
        UiElement.off(this.element.nativeElement, 'mouseleave', this.onHide);
        this.hide();
    }

    setClass() {
        if (this.top) {
            this.class = 'top';
        }
        if (this.left) {
            this.class = 'left';
        }
        if (this.right) {
            this.class = 'right';
        }
        if (this.bottom) {
            this.class = 'bottom';
        }

    }

    show(event) {
        this.setClass();
        if (this.wrap) {
            this.hide();
        }
        this.wrap = document.createElement('div');
        this.wrap.classList.add('wrap-tooltip', this.class);
        this.wrap.innerText = this.uiTooltip;

        document.body.appendChild(this.wrap);
        const elementPosition = UiElement.position(this.element.nativeElement);
        let positionLeft: number;
        let positionTop: number;

        if (this.top || this.bottom) {
            positionLeft = (elementPosition.left + this.element.nativeElement.clientWidth / 2) - (this.wrap.clientWidth / 2);
            positionTop = elementPosition.top;

            if (this.bottom) {
                positionTop += this.element.nativeElement.clientHeight;
            } else {
                positionTop -= this.wrap.clientHeight;
            }
        }

        if (this.left || this.right) {
            positionTop = (elementPosition.top + this.element.nativeElement.clientHeight / 2) - (this.wrap.clientHeight / 2);
            positionLeft = elementPosition.left;

            if (this.left) {
                positionLeft -= this.wrap.clientWidth;
            } else {
                positionLeft += this.element.nativeElement.clientWidth;
            }
        }

        UiElement.css(this.wrap, 'left', `${Math.round(positionLeft)}px`);
        UiElement.css(this.wrap, 'top', `${Math.round(positionTop)}px`);

        setTimeout(() => this.wrap.classList.add('show'));
    }

    hide() {
        if (!this.wrap) {
            return;
        }
        this.wrap.classList.add('hide');
        setTimeout(() => {
            if (!this.wrap) {
                return;
            }
            document.body.removeChild(this.wrap);
            this.wrap = null;
        }, 75);
    }
}
