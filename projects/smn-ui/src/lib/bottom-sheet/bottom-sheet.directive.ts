import {AfterViewInit, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {UiElement} from '../utils/providers/element.provider';

@Directive({
    selector: '[uiBottomSheetTrigger]'
})
export class UiBottomSheetTriggerDirective implements AfterViewInit {
    viewRef: any;
    fabs: HTMLElement;
    @Input('trigger-events') triggerEvents: string;
    @Input('theme-class') themeClass: string;
    @Input('transparent-overlay') transparentOverlay: boolean;
    @Input('uiBottomSheetTrigger') bottomSheet;

    constructor(public viewContainerRef: ViewContainerRef, public elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        this.bottomSheet.closeChange.subscribe(() => {
            this.close();
        });

        UiElement.on(this.elementRef.nativeElement, this.triggerEvents || 'click', () => {
            this.render();
        });
    }

    render() {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.bottomSheet.templateRef);
        this.viewRef.detectChanges();

        this.viewRef.rootNodes.forEach(rootNode => {
            document.body.appendChild(rootNode);

            if (rootNode.clientWidth) {
                this.open(rootNode);
            }
        });
    }

    open(element) {
        setTimeout(() => {
            const card = element.querySelector('ui-card');
            card.className += ` ${this.bottomSheet.elementRef.nativeElement.className}`;

            if (this.themeClass) {
                element.classList.add(this.themeClass);
            }
            if (this.transparentOverlay) {
                element.classList.add('transparent-overlay');
            }
            if (this.bottomSheet.cardSize) {
                card.style.maxWidth = this.bottomSheet.cardSize + 'px';
            }
            if (!this.transparentOverlay && this.fabs) {
                this.fabs.classList.add('hide');
            }

            element.querySelectorAll('.overlay')[0].addEventListener('click', () => {
                this.close();
            });

            element.style.transform = '';

            element.classList.add('open');

            UiElement.disableScroll();
        });
    }

    close() {
        if (this.viewContainerRef.length) {
            const viewRef = this.viewRef;
            if (this.fabs) {
                this.fabs.classList.remove('hide');
            }

            viewRef.rootNodes.forEach(rootNode => {
                if (rootNode.classList) {
                    rootNode.classList.remove('open');
                }
            });

            setTimeout(() => this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef)), 280);
            UiElement.enableScroll();
        }
    }

}
