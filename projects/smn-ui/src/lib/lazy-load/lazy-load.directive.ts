import {Directive, DoCheck, ElementRef, Input} from '@angular/core';
import {UiElementRef} from '../utils/providers/element-ref.provider';

@Directive({selector: '[uiLazyLoad][lazy-src]'})
export class UiLazyLoadDirective implements DoCheck {
    elementRef: any;
    visible: boolean;
    @Input('lazy-src') lazySrc: any;

    constructor(private element: ElementRef) {
        this.elementRef = new UiElementRef(element.nativeElement);
        this.elementRef.on('load', () => {
            this.elementRef.classList.add('loaded');
        });
    }

    ngDoCheck() {
        if (!this.visible && this.elementRef.isInViewport()) {
            this.visible = true;
            this.elementRef.attribute('src', this.lazySrc);
        }
    }
}
