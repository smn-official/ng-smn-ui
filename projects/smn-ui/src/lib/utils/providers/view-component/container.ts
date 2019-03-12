import {UiElement} from '../element.provider';
import ComponentOption from './component-option';
import {TemplateRef, ViewContainerRef} from '@angular/core';

export default class Container {
    componentRef: any;
    viewContainerRef: any;
    viewRef: any;
    options: ComponentOption;
    overlay: HTMLElement;
    element: HTMLElement;

    set view(viewRef) {
        this.viewRef = viewRef;
        this.viewRef.detectChanges();
    }

    get view() {
        return this.viewRef;
    }

    constructor(componentRef: any, viewContainerRef: ViewContainerRef, options: ComponentOption) {
        this.componentRef = componentRef;
        this.viewContainerRef = viewContainerRef;
        this.options = options;
    }

    prepare(template: TemplateRef<any>) {
        this.view = this.viewContainerRef.createEmbeddedView(template);

        this.element = document.createElement('div');
        this.element.classList.add('container');

        if (this.options.overlay.active) {
            this.generateOverlay();
            this.element.appendChild(this.overlay);
        }

        this.view.rootNodes.forEach(rootNode => {
            this.element.appendChild(rootNode);

            setTimeout(() => this.setCoordinate(rootNode));
        });
    }

    generateOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');

        if (this.options.overlay.transparent) {
            this.overlay.classList.add('transparent');
        }

        if (this.options.overlay.color) {
            UiElement.css(this.overlay, 'background-color', this.options.overlay.color);
        }
    }

    setCoordinate(element) {
        const verticalCoveringArea = this.options.coordinate.y + element.clientHeight;
        const bodyHeight = document.body.offsetHeight;

        if (bodyHeight < element.clientHeight) {
            UiElement.css(element, 'max-height', bodyHeight + 'px');
        }

        if (verticalCoveringArea > bodyHeight) {
            this.options.coordinate.y -= (verticalCoveringArea - bodyHeight);
        }

        if (this.options.coordinate.y < 0) {
            this.options.coordinate.y = 0;
        }

        UiElement.css(element, 'top', this.options.coordinate.y + 'px');
        UiElement.css(element, 'left', this.options.coordinate.x + 'px');
        UiElement.css(element, 'width', this.options.width + 'px');

        if (typeof this.options.onEmbeddedNode === 'function') {
            this.options.onEmbeddedNode(element);
        }

        element.classList.add('open');
    }

    remove() {
        this.view.rootNodes.forEach(rootNode => {
            if (rootNode.classList) {
                rootNode.classList.remove('open');
            }
        });
    }

}
