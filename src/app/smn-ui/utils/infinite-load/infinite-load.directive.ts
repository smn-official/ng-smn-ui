import {AfterViewInit, Directive, ElementRef, EventEmitter, Output, DoCheck} from '@angular/core';

import {UiElement} from '../providers/element.provider';
import {UiInfiniteLoadService} from './infinite-load.service';

@Directive({
    selector: '[uiInfiniteLoad]'
})
export class UiInfiniteLoadDirective implements AfterViewInit, DoCheck {
    @Output() uiInfiniteLoad: EventEmitter<any> = new EventEmitter();

    constructor(private element: ElementRef, private infiniteLoad: UiInfiniteLoadService) {
    }

    ngAfterViewInit() {
        this.infiniteLoad.register(this.element.nativeElement, () => {
            this.uiInfiniteLoad.emit();
        });
    }

    ngDoCheck() {
        UiElement.trigger(this.element.nativeElement, 'scroll');
    }
}
