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
    componentElement: any;
    pickerOpen: boolean;
    wrapDatepicker: HTMLElement;
    inputElement: HTMLElement;
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

        this.inputElement = <HTMLElement>document.querySelectorAll(`[uiDatePicker="${this.datePickerCaller}"]`)[0];

        UiElement.on(this.elementRef.nativeElement, this.pickerEvent || 'click', (e) => {
            this.referencesService.closeAll();
            const position = UiElement.position(this.inputElement);
            const coordinate = {
                x: position.left,
                y: this.inputElement.offsetHeight + position.top
            };

            if (!this.pickerOpen) {
                this.renderDatepicker(this.datePicker, coordinate);
                e.stopPropagation(); // Parando propagação do evento para os eventos do window
            }
        });

        UiElement.on(UiWindowRef.nativeWindow, 'click resize scroll', (e) => {
            if (this.pickerOpen) {
                if ((!(UiElement.is(e.target, '.wrap-datepicker') || UiElement.closest(e.target, '.wrap-datepicker')) && !(document.body.clientWidth <= 600 && e.type === 'scroll')) || UiElement.is(e.target, '.overlay')) {
                    this.closePicker();
                }
            }
        });
    }

    public getComponentAsElement(componentRef): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    public setInstances(component, componentRef): void {
        const keysComponent = ['ngModel', 'maxDate', 'minDate', 'initOnSelected', 'confirmSelection', 'select'];
        keysComponent.map(key => componentRef.instance[key] = component[key]);
        componentRef.instance.cancel.subscribe(() => this.closePicker());
        component.chosen.subscribe(value => componentRef.instance.ngOnChanges(value));
        componentRef.instance.chosen.subscribe(value => {
            this.referencesService.updateModel(this.datePickerCaller, value);
            if (this.pickerOpen) {
                this.inputElement.focus();
                this.closePicker();
            }
        });
    }

    public renderViewCalendar(element, coordinate, darkClass): void {
        this.wrapDatepicker = document.createElement('div');
        this.wrapDatepicker.classList.add('wrap-datepicker');
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        if (darkClass) {
            this.wrapDatepicker.classList.add(darkClass);
        }

        this.wrapDatepicker.style.transform = 'scale(0)';
        element.classList.add('portrait-only');
        this.wrapDatepicker.appendChild(overlay);
        this.wrapDatepicker.appendChild(element);
        document.body.appendChild(this.wrapDatepicker);

        setTimeout(() => {
            const pickerHorizontalCoveringArea = coordinate.x + element.clientWidth;
            const pickerVerticalCoveringArea = coordinate.y + element.clientHeight;
            const windowWidth = document.body.clientWidth + document.body.scrollLeft;
            const windowHeight = document.body.clientHeight + document.body.scrollTop;

            if (pickerHorizontalCoveringArea > windowWidth) {
                coordinate.x = windowWidth - (pickerHorizontalCoveringArea + 8);
            }
            if (pickerVerticalCoveringArea > windowHeight) {
                coordinate.y = windowHeight - (element.clientHeight + 8);
            }

            this.wrapDatepicker.style.transform = '';
            element.style.position = 'absolute';
            element.style.top = coordinate.y + 'px';
            element.style.left = coordinate.x + 'px';

            this.wrapDatepicker.classList.add('open');
            if (document.body.clientWidth <= 600) {
                document.body.style.overflowY = 'hidden';
            }
        });
    }

    public renderDatepicker(component, coordinate): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UiCalendarComponent);
        this.componentRef = componentFactory.create(this.injector);
        this.componentElement = this.getComponentAsElement(this.componentRef);

        this.setInstances(component, this.componentRef);
        this.applicationRef.attachView(this.componentRef.hostView);
        this.renderViewCalendar(this.componentElement, coordinate, component.darkClass);
        this.pickerOpen = true;
    }

    public closePicker(): void {
        this.wrapDatepicker.classList.remove('open');
        setTimeout(() => {
            this.pickerOpen = false;
            this.applicationRef.detachView(this.componentRef.hostView);
            document.body.style.overflowY = '';
            try {
                document.body.removeChild(this.wrapDatepicker);
            } catch (e) { }
        }, 280);
    }
}
