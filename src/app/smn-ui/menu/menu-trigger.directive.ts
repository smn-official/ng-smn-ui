import {AfterViewInit, Directive, ElementRef, Input, ViewContainerRef, AfterViewChecked} from '@angular/core';
import {UiElement} from '../utils/providers/element.provider';
import {UiWindowRef} from '../utils/providers/window.provider';

@Directive({
    selector: '[uiMenuTrigger]'
})
export class UiMenuTriggerDirective implements AfterViewInit, AfterViewChecked {
    viewRef;
    @Input('trigger-events') triggerEvents;
    @Input('theme-class') themeClass;
    @Input() align;
    @Input('menu-align') menuAlign;
    @Input('uiMenuTrigger') menu;
    @Input() persistentMenu;

    constructor(public viewContainerRef: ViewContainerRef, public elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        this.menu.closeChange.subscribe(() => {
            this.close();
        });

        UiElement.on(this.elementRef.nativeElement, this.triggerEvents || 'click', () => {
            if (!this.persistentMenu) {
                this.close();
            }

            setTimeout(() => {
                const position = UiElement.position(this.elementRef.nativeElement);
                const coordinate = {
                    x: position.left,
                    y: position.top
                };
                this.render(coordinate);
            });
        });

        UiElement.on(UiWindowRef.nativeWindow, 'mouseup resize scroll touchend', (e) => {
            if (this.elementRef.nativeElement !== e.target) {
                if (!this.persistentMenu) {
                    this.close();
                }
            }
        });
    }

    ngAfterViewChecked() {
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
            const windowHeight = document.body.clientHeight + (document.body.scrollTop || window.scrollY);

            if (this.align === 'right' || this.menuAlign === 'right') {
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

            if (coordinate.y <= 0) {
                coordinate.y = 0;
            }

            if (this.themeClass) {
                element.classList.add(this.themeClass);
            }
            if (this.align || this.menuAlign) {
                element.classList.add(this.align || this.menuAlign);
            }

            element.style.transform = '';
            element.querySelector('ui-card').style.maxHeight = UiWindowRef.nativeWindow.innerHeight + 'px';
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
