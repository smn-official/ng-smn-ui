import {AfterViewInit, Directive, ElementRef, Output, DoCheck, Input} from '@angular/core';
import {UiInfiniteLoadService} from './infinite-load.service';

@Directive({
    selector: '[uiInfiniteLoad]'
})
export class UiInfiniteLoadDirective implements AfterViewInit, DoCheck {
    @Output() uiInfiniteLoad;
    @Input() orientation;

    constructor(private element: ElementRef, private infiniteLoad: UiInfiniteLoadService) {
        this.orientation = 'vertical';
    }

    ngAfterViewInit() {
        this.infiniteLoad.register(this.element.nativeElement, () => {
            this.uiInfiniteLoad.emit();
        }, this.orientation);
    }

    ngDoCheck() {
        if (this.infiniteLoad.listener) {
            this.infiniteLoad.listener();
        }
    }
}
