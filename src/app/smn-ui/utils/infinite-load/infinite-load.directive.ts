import {AfterViewInit, Directive, ElementRef, EventEmitter, Output, DoCheck} from '@angular/core';

@Directive({
    selector: '[uiInfiniteLoad]'
})
export class UiInfiniteLoadDirective implements AfterViewInit, DoCheck {
    @Output() uiInfiniteLoad: EventEmitter<any> = new EventEmitter();
    readyToCheck: boolean;

    constructor(private element: ElementRef) {
    }

    ngAfterViewInit() {
        this.element.nativeElement.addEventListener('scroll', () => {
            const heightOffset = this.element.nativeElement.scrollHeight - this.element.nativeElement.clientHeight;
            const scrollTop = this.element.nativeElement.scrollTop;
            const safeZone = heightOffset * 0.1;

            if (scrollTop >= heightOffset - safeZone) {
                this.uiInfiniteLoad.emit();
            }
        });
        this.readyToCheck = true;
    }

    ngDoCheck() {
        if (this.readyToCheck) {
            const heightOffset = this.element.nativeElement.scrollHeight - this.element.nativeElement.clientHeight;
            const scrollTop = this.element.nativeElement.scrollTop;
            const safeZone = heightOffset * 0.1;

            if (scrollTop >= heightOffset - safeZone) {
                this.uiInfiniteLoad.emit();
            }
        }
    }
}
