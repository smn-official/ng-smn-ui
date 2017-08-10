import {AfterViewInit, Directive, ElementRef, EventEmitter, Output, DoCheck} from '@angular/core';
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
        if (this.infiniteLoad.listener) {
            this.infiniteLoad.listener();
        }
    }
}
