import {
    Component, ElementRef, EventEmitter, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {UiWindowRef} from '../utils/providers/window.provider';
import {UiElement} from '../utils/providers/element.provider';

@Component({
    selector: 'ui-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiMenuComponent implements OnDestroy {
    viewRef;
    menu;
    themeClass;
    menuAlign;
    persistentMenu;
    element;
    listenerExists;

    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
    @Output() closeChange: EventEmitter<any> = new EventEmitter(); // OLD VERSION

    constructor(public viewContainerRef: ViewContainerRef, public elementRef: ElementRef) {
    }

    ngOnDestroy() {
        this.close();
    }

    show(event, config?) {
        if (config) {
            this.element = config.element || null;
            this.themeClass = config.class || null;
            this.menuAlign = config.align || null;
            this.persistentMenu = config.persistent || null;
        }

        this.createListener();

        let coordinate = {
            x: event.clientX,
            y: event.clientY
        };
        if (this.element) {
            const position = UiElement.position(this.element);
            coordinate = {
                x: position.left,
                y: position.top
            };
        }
        this.render(coordinate);
    }

    render(coordinate) {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
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

            if (this.menuAlign === 'right') {
                coordinate.x -= element.clientWidth - (this.element ? this.element.clientWidth : 0);
                horizontalCoveringArea = coordinate.x;
            }

            if (horizontalCoveringArea > windowWidth) {
                element.classList.add('right');
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
            if (this.menuAlign) {
                element.classList.add(this.menuAlign);
            }

            element.style.transform = '';
            element.querySelector('ui-card').style.maxHeight = UiWindowRef.nativeWindow.innerHeight + 'px';
            element.style.top = coordinate.y + 'px';
            element.style.left = coordinate.x + 'px';
            element.classList.add('open');
        });
    }

    close() {
        this.closeChange.emit(); // OLD VERSION

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

    createListener() {
        if (!this.listenerExists) {
            this.listenerExists = true;
            UiElement.on(UiWindowRef.nativeWindow, 'mouseup resize scroll touchend', (e) => {
                if (this.elementRef.nativeElement !== e.target) {
                    if (!this.persistentMenu) {
                        this.close();
                    }
                }
            });
        }

    }
}
