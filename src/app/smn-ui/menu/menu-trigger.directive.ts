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
    @Input('uiMenuTrigger') menu;
    isMobile: boolean;

    constructor(public viewContainerRef: ViewContainerRef, public elementRef: ElementRef) {
        this.isMobile = UiWindowRef.nativeWindow.innerWidth <= 763;

        UiWindowRef.nativeWindow.addEventListener('resize', () => {
            this.isMobile = UiWindowRef.nativeWindow.innerWidth <= 763;
        });
    }

    ngAfterViewInit() {
        this.menu.closeChange.subscribe(() => {
            this.close();
        });

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

        UiElement.on(UiWindowRef.nativeWindow, 'mouseup resize scroll touchend', (e) => {
            if (this.elementRef.nativeElement !== e.target) {
                if (this.isMobile) {
                    debounce(() => {
                        this.close();
                    }, 300)();
                } else {
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
            const windowHeight = document.body.clientHeight + document.body.scrollTop;

            if (this.align === 'right') {
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

            if (this.themeClass) {
                element.classList.add(this.themeClass);
            }
            if (this.align) {
                element.classList.add(this.align);
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

function debounce(func, wait, immediate?) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}
