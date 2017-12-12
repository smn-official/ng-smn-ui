import {
    AfterViewInit,
    ApplicationRef,
    ComponentFactoryResolver,
    Directive,
    EmbeddedViewRef,
    ElementRef,
    Injector,
    Input
} from '@angular/core';

import {UiTimePickerService} from './time-picker.service';
import {UiElement} from '../utils/providers/element.provider';
import {UiWindowRef} from '../utils/providers/window.provider';
import {UiClockComponent} from '../clock/clock.component';

@Directive({
    selector: '[uiTimePickerCaller]'
})
export class UiTimePickerCallerDirective implements AfterViewInit {
    timePicker;
    componentRef: any;
    componentElement: any;
    pickerOpen: boolean;
    wrapTimePicker: HTMLElement;
    inputElement: HTMLElement;
    @Input() pickerEvent: string;
    @Input('uiTimePickerCaller') timePickerCaller: string;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private applicationRef: ApplicationRef,
                private injector: Injector,
                private timePickerService: UiTimePickerService,
                private elementRef: ElementRef) {
    }

    public ngAfterViewInit(): void {
        this.timePicker = this.timePickerService.get(this.timePickerCaller);

        UiElement.on(this.elementRef.nativeElement, this.pickerEvent || 'click', (e) => {
            this.inputElement = <HTMLElement>document.querySelector(`[time-picker-name="${this.timePickerCaller}"]`);

            this.timePickerService.closeAll();
            const position = UiElement.position(this.inputElement);
            const coordinate = {
                x: position.left,
                y: this.inputElement.offsetHeight + position.top
            };

            if (!this.pickerOpen) {
                this.renderTimePicker(this.timePicker, coordinate);
                e.stopPropagation(); // Parando propagação do evento para os eventos do window
            }
        });

        UiElement.on(UiWindowRef.nativeWindow, 'click resize scroll', (e) => {
            if (this.pickerOpen) {
                if ((!(UiElement.is(e.target, '.wrap-time-picker') || UiElement.closest(e.target, '.wrap-time-picker'))
                        && !(document.body.clientWidth <= 600 && e.type === 'scroll')) || UiElement.is(e.target, '.overlay')) {
                    this.closePicker();
                }
            }
        });
    }

    public getComponentAsElement(componentRef): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    public setInstances(component, componentRef): void {
        const keysComponent = ['ngModel', 'confirmSelection', 'select'];
        keysComponent.map(key => componentRef.instance[key] = component[key]);
        componentRef.instance.focused = true;

        component.chosen.subscribe(value => componentRef.instance.ngOnChanges(value));
        componentRef.instance.cancel.subscribe(() => this.closePicker());

        componentRef.instance.chosen.subscribe(objectValue => {
            this.timePickerService.updateModel(this.timePickerCaller, objectValue.value);
            if (this.pickerOpen && objectValue.close) {
                this.inputElement.focus();
                this.closePicker();
            }
        });
    }

    public renderViewClock(element, coordinate, themeClass): void {
        this.wrapTimePicker = document.createElement('div');
        this.wrapTimePicker.classList.add('wrap-time-picker');
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        if (themeClass) {
            this.wrapTimePicker.classList.add(themeClass);
        }

        this.wrapTimePicker.style.transform = 'scale(0)';
        element.classList.add('portrait-only');
        this.wrapTimePicker.appendChild(overlay);
        this.wrapTimePicker.appendChild(element);
        document.body.appendChild(this.wrapTimePicker);

        setTimeout(() => {
            const pickerHorizontalCoveringArea = coordinate.x + element.clientWidth;
            const pickerVerticalCoveringArea = coordinate.y + element.clientHeight;
            const windowWidth = UiWindowRef.nativeWindow.innerWidth + (document.body.scrollLeft || window.scrollX);
            const windowHeight = UiWindowRef.nativeWindow.innerHeight + (document.body.scrollTop || window.scrollY);

            if (pickerHorizontalCoveringArea > windowWidth) {
                coordinate.x = windowWidth - (element.clientWidth + 8);
            }
            if (pickerVerticalCoveringArea > windowHeight) {
                coordinate.y = windowHeight - (element.clientHeight + 8);
            }

            this.wrapTimePicker.style.transform = '';
            element.style.position = 'absolute';
            element.style.top = coordinate.y + 'px';
            element.style.left = coordinate.x + 'px';

            this.wrapTimePicker.classList.add('open');
            if (document.body.clientWidth <= 600) {
                document.body.style.overflowY = 'hidden';
            }
        });
    }

    public renderTimePicker(component, coordinate): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UiClockComponent);
        this.componentRef = componentFactory.create(this.injector);
        this.componentElement = this.getComponentAsElement(this.componentRef);

        this.setInstances(component, this.componentRef);
        this.applicationRef.attachView(this.componentRef.hostView);
        this.renderViewClock(this.componentElement, coordinate, component.themeClass);
        this.pickerOpen = true;
    }

    public closePicker(): void {
        this.wrapTimePicker.classList.remove('open');
        setTimeout(() => {
            this.pickerOpen = false;
            this.applicationRef.detachView(this.componentRef.hostView);
            document.body.style.overflowY = '';
            try {
                document.body.removeChild(this.wrapTimePicker);
            } catch (e) {
            }
        }, 280);
    }
}
