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

import {UiReferencesService} from './references.service';
import {UiElement} from '../providers/element.provider';
import {UiWindowRef} from '../providers/window.provider';
import {UiCalendarComponent} from '../calendar/calendar.component';


@Directive({
    selector: '[uiDatepickerCaller]'
})
export class UiDatepickerCallerDirective implements AfterViewInit {
    datePicker;
    componentRef: any;
    pickerOpen: boolean;
    wrapDatepicker: HTMLElement;
    @Input() pickerEvent: string;
    @Input('uiDatepickerCaller') datePickerCaller: string;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private applicationRef: ApplicationRef,
                private injector: Injector,
                private referencesService: UiReferencesService,
                private elementRef: ElementRef) {
    }

    public ngAfterViewInit(): void {
        this.datePicker = this.referencesService.get(this.datePickerCaller);

        const inputElement: HTMLElement = <HTMLElement>document.querySelectorAll(`[uiDatePicker="${this.datePickerCaller}"]`)[0];

        UiElement.on(this.elementRef.nativeElement, this.pickerEvent || 'click', (e) => {
            const position = UiElement.position(inputElement);
            const coordinate = {
                x: position.left,
                y: inputElement.offsetHeight + position.top + 1 // 1 para alinhar a linha do input
            };

            this.renderDatepicker(this.datePicker, coordinate);
            e.stopPropagation(); // Parando propagação do evento para os eventos do window
        });

        UiElement.on(UiWindowRef.nativeWindow, 'click resize scroll', (e) => {
            if (this.pickerOpen) {
                if ((!(UiElement.is(e.target, '.wrap-datepicker') || UiElement.closest(e.target, '.wrap-datepicker')) && !(document.body.clientWidth < 600 && e.type === 'scroll')) || UiElement.is(e.target, '.overlay')) {
                    this.closePicker();
                }
            }
        });
    }

    public getComponentAsElement(componentRef): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    public setInstances(component, componentRef): void {
        componentRef.instance.ngModel = component.ngModel;
        componentRef.instance.maxDate = component.maxDate;
        componentRef.instance.minDate = component.minDate;
        componentRef.instance.initOnSelected = component.initOnSelected;
        componentRef.instance.confirmSelection = component.confirmSelection;
        componentRef.instance.select = component.select;
        componentRef.instance.chosen.subscribe(value => {
            this.referencesService.updateModel(this.datePickerCaller, value);
            if (this.pickerOpen) {
                this.closePicker();
            }
        });
        componentRef.instance.cancel.subscribe(() => this.closePicker());
        component.chosen.subscribe(value => componentRef.instance.ngOnChanges(value));
    }

    public renderViewCalendar(element, coordinate, darkClass): void {
        this.wrapDatepicker = document.createElement('div');
        this.wrapDatepicker.classList.add('wrap-datepicker');
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        if (darkClass) {
            this.wrapDatepicker.classList.add(darkClass);
        }

        element.classList.add('portrait-only');
        element.style.position = 'absolute';
        element.style.top = coordinate.y + 'px';
        element.style.left = coordinate.x + 'px';

        this.wrapDatepicker.appendChild(overlay);
        this.wrapDatepicker.appendChild(element);
        document.body.appendChild(this.wrapDatepicker);

    }

    public renderDatepicker(component, coordinate): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UiCalendarComponent);
        this.componentRef = componentFactory.create(this.injector);
        const componentElement = this.getComponentAsElement(this.componentRef);

        this.setInstances(component, this.componentRef);
        this.applicationRef.attachView(this.componentRef.hostView);
        this.renderViewCalendar(componentElement, coordinate, component.darkClass);
        this.pickerOpen = true;
    }

    public closePicker(): void {
        this.pickerOpen = false;
        this.applicationRef.detachView(this.componentRef.hostView);
        document.body.removeChild(this.wrapDatepicker);
    }
}
