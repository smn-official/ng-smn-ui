import {Injectable, TemplateRef, ViewContainerRef} from '@angular/core';
import ComponentOption from './component-option';
import Container from './container';

@Injectable({
    providedIn: 'root'
})
export class ViewComponentService {

    containers: any;
    defaultOptions: ComponentOption;
    containerElement: HTMLElement;

    constructor() {
        this.containers = [];
        this.defaultOptions = {
            overlay: {
                active: false,
                transparent: false
            },
            coordinate: {
                x: 0,
                y: 0
            },
            width: 0
        };
    }

    get container() {
        if (!this.containerElement) {
            this.containerElement = this.generateContainer();
        }
        return this.containerElement;
    }

    set container(element: HTMLElement) {
        this.containerElement = element;
    }

    generateContainer() {
        const container = document.createElement('div');
        container.classList.add('ui-view-component');
        document.body.appendChild(container);
        return container;
    }

    renderEmbeddedView(componentRef: any,
                       viewContainerRef: ViewContainerRef,
                       template: TemplateRef<any>,
                       options: ComponentOption) {
        const optionsMerged = { ...this.defaultOptions, ...options};

        const container = new Container(componentRef, viewContainerRef, optionsMerged);
        container.prepare(template);

        this.append(container);
    }

    append(container) {
        this.container.classList.remove('hidden');
        this.container.appendChild(container.element);
        this.containers.push(container);
    }

    removeEmbeddedView(componentRef) {
        let containerIndex = -1;
        const container: Container = this.containers.find((containerItem, index) => {
            if (containerItem.componentRef !== componentRef) {
                return;
            }

            containerIndex = index;
            return true;
        });

        if (!container) {
            return;
        }

        container.remove();
        this.removeContainer(containerIndex);

        setTimeout(() => {
            this.container.removeChild(container.element);
            container.viewContainerRef.clear();
        }, 280);
    }

    removeContainer(index) {
        this.containers.splice(index, 1);

        if (this.containers.length) {
            return;
        }

        setTimeout(() => this.container.classList.add('hidden'), 280);
    }
}
