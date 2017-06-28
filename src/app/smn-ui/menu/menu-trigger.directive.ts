import {AfterViewInit, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {UiElement} from '../providers/element.provider';
import {UiWindowRef} from '../providers/window.provider';

@Directive({
    selector: '[uiMenuTrigger]'
})
export class UiMenuTriggerDirective implements AfterViewInit {

    viewRef;
    mouseDownTarget;
    @Input() triggerEvents;
    @Input('uiMenuTrigger') menu;

    constructor(public viewContainerRef: ViewContainerRef, public elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        UiElement.on(this.elementRef.nativeElement, this.triggerEvents || 'click', () => {
            this.close();

            setTimeout(() => {
                const position = UiElement.position(this.elementRef.nativeElement);
                const coordinate = {
                    x: position.left,
                    y: position.top
                };
                this.render(coordinate);
            });
        });

        UiElement.on(UiWindowRef.nativeWindow, 'mousedown touchstart', (e) => {
            this.mouseDownTarget = e.target;
        });

        UiElement.on(UiWindowRef.nativeWindow, 'click resize scroll', (e) => {
            if (!this.mouseDownTarget || this.mouseDownTarget === e.target) {
                this.close();
            }

            this.mouseDownTarget = null;
        });
    }

    render(coordinate) {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.menu.templateRef);
        this.viewRef.detectChanges();

        this.viewRef.rootNodes.forEach(rootNode => {
            document.body.appendChild(rootNode);

            if (rootNode.clientWidth) {
                this.open(rootNode, coordinate);
            }
        });
    }

    open(element, coordinate) {
        setTimeout(() => {
            let horizontalCoveringArea = coordinate.x + element.clientWidth;
            const verticalCoveringArea = coordinate.y + element.clientHeight;
            const windowWidth = window.innerWidth + document.body.scrollLeft;
            const windowHeight = document.body.clientHeight + document.body.scrollTop;

            if (this.menu.align === 'right') {
                coordinate.x -= element.clientWidth - this.elementRef.nativeElement.clientWidth;
                horizontalCoveringArea = coordinate.x;
            }

            if (horizontalCoveringArea > windowWidth) {
                coordinate.x = windowWidth - (element.clientWidth + 8);
            }

            if (coordinate.x <= 8) {
                coordinate.x = 8;
            }

            if (verticalCoveringArea > windowHeight) {
                coordinate.y = windowHeight - (element.clientHeight + 8);
            }

            if (this.menu.darkClass) {
                element.classList.add(this.menu.darkClass);
            }
            if (this.menu.align) {
                element.classList.add(this.menu.align);
            }

            element.style.transform = '';
            element.style.top = coordinate.y + 'px';
            element.style.left = coordinate.x + 'px';


            element.classList.add('open');
        });
    }

    close() {
        if (this.viewContainerRef.length) {
            const viewRef = this.viewRef; // Salvando a referência para achar o index deste componente

            viewRef.rootNodes.forEach(rootNode => {
                if (rootNode.classList) {
                    rootNode.classList.remove('open');
                }
            });

            setTimeout(() => this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef)), 280);
        }
    }

}
