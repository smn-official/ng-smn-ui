import {Directive, ElementRef, AfterViewInit, HostListener, Input, OnChanges} from '@angular/core';

@Directive({selector: 'th[uiDataTableOrderBy]'})
export class UiDataTableOrderByDirective implements AfterViewInit, OnChanges {
    @Input('withCondition') withCondition: boolean;
    @Input('uiDataTableOrderBy') uiDataTableOrderBy: 'ASC' | 'DESC' | null;

    constructor(private element: ElementRef) {
    }

    ngAfterViewInit() {
        const icon: HTMLElement = document.createElement('i');
        icon.classList.add('material-icons');
        icon.innerHTML = 'arrow_downward';

        if (this.element.nativeElement.classList.contains('align-right')) {
            this.element.nativeElement.insertBefore(icon.cloneNode(true), this.element.nativeElement.firstChild);
        } else {
            this.element.nativeElement.appendChild(icon.cloneNode(true));
        }
    }

    ngOnChanges(changes) {
        if (changes.uiDataTableOrderBy && !changes.uiDataTableOrderBy.firstChange) {
            this.uiDataTableOrderBy = changes.uiDataTableOrderBy.currentValue;
            this.orderByCondition();
        }
    }

    orderByClick() {
        if (this.element.nativeElement.classList.contains('order_desc')
            || this.element.nativeElement.classList.contains('order_asc')) {
            if (this.element.nativeElement.classList.contains('order_asc')) {
                this.element.nativeElement.classList.add('order_desc');
                this.element.nativeElement.classList.remove('order_asc');
            } else if (this.element.nativeElement.classList.contains('order_desc')) {
                this.element.nativeElement.classList.remove('order_desc');
                this.element.nativeElement.classList.remove('order_asc');
            }
        } else {
            this.element.nativeElement.classList.add('order_asc');
        }
    }

    orderByCondition() {
        switch (this.uiDataTableOrderBy) {
            case 'ASC':
                this.element.nativeElement.classList.add('order_asc');
                this.element.nativeElement.classList.remove('order_desc');
                break;
            case 'DESC':
                this.element.nativeElement.classList.add('order_desc');
                this.element.nativeElement.classList.remove('order_asc');
                break;
            default:
                this.element.nativeElement.classList.remove('order_asc', 'order_desc');
                break;
        }
    }

    @HostListener('click') onClick() {
        if (this.withCondition) {
            return;
        }

        this.orderByClick();
    }
}
