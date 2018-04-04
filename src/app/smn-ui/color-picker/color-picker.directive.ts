import {
    AfterViewInit, ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EmbeddedViewRef, EventEmitter,
    Injector, Input, OnChanges, Output
} from '@angular/core';
import {palette} from './color-picker.palette';
import {UiElement} from '../utils/providers/element.provider';
import {UiColorPickerComponent} from './color-picker.component';
import {UiWindowRef} from '../utils/providers/window.provider';

@Directive({
    selector: '[uiColorPicker]'
})
export class UiColorPickerDirective implements AfterViewInit, OnChanges {

    @Input() ngModel;
    @Input('theme-class') themeClass;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    elementColor;
    palette;
    componentRef;
    wrapElement;
    componentElement;

    constructor(private element: ElementRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private applicationRef: ApplicationRef,
                private injector: Injector) {
        this.palette = palette;
    }

    ngAfterViewInit() {
        this.generateElementColor();
        this.setColorElement(this.ngModel);

        this.element.nativeElement.classList.add('elevate');
        this.element.nativeElement.parentNode.appendChild(this.elementColor);

        this.addEvents();

        this.ngModelChange.subscribe(color => {
            this.setColorElement(color);
        });
    }

    ngOnChanges(changes) {
        if (changes.ngModel && !changes.ngModel.firstChange) {
            this.ngModel = changes.ngModel.currentValue;
            this.setColorElement(this.ngModel);
        }
    }

    generateElementColor() {
        this.elementColor = document.createElement('div');
        this.elementColor.classList.add('ui-color');
        this.elementColor.setAttribute('tabindex', '1');
    }

    setColorElement(color) {
        let icon = this.elementColor.querySelector('i');

        if (color) {
            if (icon) {
                icon.remove();
            }
            this.elementColor.setAttribute('style', `background-color: ${color}`);
        } else if (!icon) {
            icon = document.createElement('i');
            icon.classList.add('material-icons', 'secondary-text');
            icon.innerText = 'block';
            this.elementColor.appendChild(icon);
            this.elementColor.setAttribute('style', '');
        }
    }

    addEvents() {
        UiElement.on(this.elementColor, 'click', e => {
            const position = UiElement.position(this.elementColor);
            const coordinate = {
                x: position.left,
                y: position.top
            };

            if (!this.componentRef) {
                this.createComponent();
                this.setInstances(this, this.componentRef);
                this.applicationRef.attachView(this.componentRef.hostView);
                this.componentElement = this.getComponentAsElement();
                this.render(this.componentElement, coordinate);
                e.stopPropagation();
            }
        });

        UiElement.on(UiWindowRef.nativeWindow, 'click resize scroll', (e) => {
            if (this.componentRef) {
                if ((!(UiElement.is(e.target, '.wrap-color-picker') || UiElement.closest(e.target, '.wrap-color-picker')) && !(document.body.clientWidth <= 600 && e.type === 'scroll')) || UiElement.is(e.target, '.overlay')) {
                    this.close();
                }
            }
        });
    }

    private createComponent() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UiColorPickerComponent);
        this.componentRef = componentFactory.create(this.injector);
    }

    private getComponentAsElement(): HTMLElement {
        return (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    private setInstances(component, componentRef): void {
        const keysComponent = ['ngModel', 'ngModelChange'];

        keysComponent.forEach(key => {
            componentRef.instance[key] = component[key];
        });
    }

    private render(element, coordinate): void {
        this.createWrapElement();
        this.wrapElement.appendChild(element);

        document.body.appendChild(this.wrapElement);

        setTimeout(() => {
            if (this.themeClass) {
                this.wrapElement.classList.add(this.themeClass);
            }

            this.wrapElement.classList.add('open');

            this.setPosition(coordinate);
        });
    }

    private createWrapElement() {
        this.wrapElement = document.createElement('div');
        this.wrapElement.classList.add('wrap-color-picker');
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        this.wrapElement.appendChild(overlay);
    }

    private setPosition(coordinate) {
         const horizontalCoveringArea = coordinate.x + this.componentElement.clientWidth;
        const verticalCoveringArea = coordinate.y + this.componentElement.clientHeight;
        const windowWidth = window.innerWidth + document.body.scrollLeft;
        const windowHeight = window.innerHeight + document.body.scrollTop;

        if (horizontalCoveringArea > windowWidth) {
            coordinate.x = windowWidth - (this.componentElement.clientWidth + 8);
        }

        if (coordinate.x <= 8) {
            coordinate.x = 8;
        }

        if (verticalCoveringArea > windowHeight) {
            coordinate.y = coordinate.y - this.componentElement.clientHeight;
        }

        this.componentElement.style.top = (coordinate.y) + 'px';
        this.componentElement.style.left = coordinate.x + 'px';
    }

    private close() {
        if (this.wrapElement) {
            this.wrapElement.classList.remove('open');
            setTimeout(() => {
                if (this.componentRef) {
                    this.componentRef.instance.colors.forEach(color => color.selected = false);
                    this.applicationRef.detachView(this.componentRef.hostView);
                    this.componentRef = null;
                    this.wrapElement.remove();
                }
            }, 280);
        }

    }
}
