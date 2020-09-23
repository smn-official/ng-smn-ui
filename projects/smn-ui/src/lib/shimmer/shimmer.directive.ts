import {AfterViewInit, Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[uiShimmer]'
})
export class UiShimmerDirective implements OnInit, AfterViewInit {

    public elShimmerContainerTemplate: HTMLElement;
    public elShimmerContainerTemplateClone: HTMLElement;

    constructor(public element: ElementRef) {
    }

    ngOnInit() {
        console.log('olá');
    }

    ngAfterViewInit() {
        this.elShimmerContainerTemplate = document.createElement('span');
        this.elShimmerContainerTemplate.classList.add('ui-shimmer-container');
        this.elShimmerContainerTemplateClone = <HTMLElement>this.elShimmerContainerTemplate.cloneNode(true);

        this.teste();
    }

    teste() {
        const cs = getComputedStyle(this.element.nativeElement);
        const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
        const paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingTop);
        const borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
        const borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

        const element = {
            width: this.element.nativeElement.offsetWidth - paddingX - borderX,
            height: this.element.nativeElement.offsetHeight - paddingY - borderY,
        };

        this.elShimmerContainerTemplateClone.style.width = `${element.width}px`;
        this.elShimmerContainerTemplateClone.style.height = `${element.height}px`;
        this.elShimmerContainerTemplateClone.style.minHeight = '18px';

        this.element.nativeElement.appendChild(this.elShimmerContainerTemplateClone);
    }
}
