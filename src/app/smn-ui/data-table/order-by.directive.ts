import {Directive, ElementRef, AfterViewInit, HostListener} from '@angular/core';

const icon: HTMLElement = document.createElement('i');
icon.classList.add('material-icons');
icon.innerHTML = 'arrow_downward';

@Directive({selector: 'th[uiDataTableOrderBy]'})
export class UiDataTableOrderByDirective implements AfterViewInit {
    constructor(private element: ElementRef) {
    }

    ngAfterViewInit() {
        if (this.element.nativeElement.classList.contains('align-right')) {
            this.element.nativeElement.insertBefore(icon.cloneNode(true), this.element.nativeElement.firstChild);
        } else {
            this.element.nativeElement.appendChild(icon.cloneNode(true));
        }
    }

    @HostListener('click') onClick() {
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
}
