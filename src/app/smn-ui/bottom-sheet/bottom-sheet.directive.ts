import {AfterViewInit, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {UiElement} from '../utils/providers/element.provider';

@Directive({
    selector: '[uiBottomSheetTrigger]'
})
export class UiBottomSheetTriggerDirective implements AfterViewInit {
    viewRef;
    @Input('trigger-events') triggerEvents: string;
    @Input('dark-class') darkClass: string;
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
            if (this.darkClass) {
                element.classList.add(this.darkClass);
            }
            if (this.transparentOverlay) {
                element.classList.add('transparent-overlay');
            }
            if (this.bottomSheet.cardSize) {
                element.querySelectorAll('ui-card')[0].style.maxWidth = this.bottomSheet.cardSize + 'px';
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
