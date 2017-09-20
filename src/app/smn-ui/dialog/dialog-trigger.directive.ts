import {AfterViewInit, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {UiElement} from '../utils/providers/element.provider';
import {UiElementRef} from '../utils/providers/element-ref.provider';

@Directive({
    selector: '[uiDialogTrigger]'
})
export class UiDialogTriggerDirective implements AfterViewInit {
    viewRef: any;
    fabs;
    @Input('trigger-events') triggerEvents: string;
    @Input('dark-class') darkClass: string;
    @Input('transparent-overlay') transparentOverlay: boolean;
    @Input('uiDialogTrigger') dialog;

    constructor(public viewContainerRef: ViewContainerRef, public elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        this.dialog.closeChange.subscribe(() => {
            this.close();
        });

        UiElement.on(this.elementRef.nativeElement, this.triggerEvents || 'click', () => {
            this.render();
        });
    }

    render() {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.dialog.templateRef);
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
            this.fabs = new UiElementRef(document).querySelector('.ui-fab-container');

            if (this.darkClass) {
                element.classList.add(this.darkClass);
            }
            if (this.transparentOverlay) {
                element.classList.add('transparent-overlay');
            }
            if (this.dialog.cardSize) {
                element.querySelectorAll('ui-card')[0].style.maxWidth = this.dialog.cardSize + 'px';
                element.querySelectorAll('ui-card')[0].style.width = '100%';
            }

            if (!this.transparentOverlay && this.fabs.length) {
                this.fabs.classList.add('hide');
            }
            element.querySelectorAll('.overlay')[0].addEventListener('click', () => {
                this.close();
            });

            element.style.transform = '';

            element.classList.add('open');

            document.body.style.overflowY = 'hidden';
        });
    }

    close() {
        if (this.viewContainerRef.length) {
            const viewRef = this.viewRef; // Salvando a referência para achar o index deste componente
            if (this.fabs.length) {
                this.fabs.classList.remove('hide');
            }


            viewRef.rootNodes.forEach(rootNode => {
                if (rootNode.classList) {
                    rootNode.classList.remove('open');
                }
            });

            setTimeout(() => this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef)), 280);
            document.body.style.overflowY = '';
        }
    }

}
