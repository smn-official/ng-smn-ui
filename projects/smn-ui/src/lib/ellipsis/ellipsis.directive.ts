import {Directive, ElementRef, Input, OnInit, Output} from '@angular/core';
import {UiElementRef} from '../utils/providers/element-ref.provider';

@Directive({selector: '[uiEllipsis]'})
export class UiEllipsisDirective implements OnInit {
    @Input() uiEllipsis: number;
    @Output() uiEllipsisChange: number;
    @Input('line-height') lineHeight: number;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        const elementRef = new UiElementRef(this.element.nativeElement);

        this.uiEllipsis = this.uiEllipsis || 1;
        this.lineHeight = this.lineHeight || 17;

        elementRef.css('-webkit-line-clamp', this.uiEllipsis);
        elementRef.css('max-height', (this.lineHeight * this.uiEllipsis) + 'px');
        elementRef.css('line-height', this.lineHeight + 'px');

        elementRef.on('mousemove', () => {
            if (elementRef.nativeElement.scrollHeight > elementRef.nativeElement.clientHeight) {
                elementRef.nativeElement.setAttribute('title', elementRef.nativeElement.innerText);
            } else {
                elementRef.nativeElement.removeAttribute('title');
            }
        });
    }
}
