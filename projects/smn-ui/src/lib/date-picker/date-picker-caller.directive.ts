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
import {UiElement} from '../utils/providers/element.provider';
import {UiWindowRef} from '../utils/providers/window.provider';
import {UiCalendarComponent} from '../calendar/calendar.component';

@Directive({
    selector: '[uiDatePickerCaller]'
})
export class UiDatePickerCallerDirective implements AfterViewInit {
    datePicker;
    componentRef: any;
    componentElement: any;
    pickerOpen: boolean;
    wrapDatePicker: HTMLElement;
    inputElement: HTMLElement;
    @Input() pickerEvent: string;
    @Input('uiDatePickerCaller') datePickerCaller: string;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private applicationRef: ApplicationRef,
                private injector: Injector,
                private referencesService: UiReferencesService,
                private elementRef: ElementRef) {
    }

    public ngAfterViewInit(): void {
        this.datePicker = this.referencesService.get(this.datePickerCaller);

        UiElement.on(this.elementRef.nativeElement, this.pickerEvent || 'click', (e) => {
            this.inputElement = <HTMLElement>document.querySelector(`[date-picker-name="${this.datePickerCaller}"]`);

            this.referencesService.closeAll();

            if (!this.pickerOpen) {
                this.renderDatePicker(this.datePicker);
                e.stopPropagation(); // Parando propagação do evento para os eventos do window
            }
        });

        UiElement.on(window, 'click resize scroll', (e) => {
            if (this.pickerOpen) {
                if ((!(UiElement.is(e.target, '.wrap-date-picker') || UiElement.closest(e.target, '.wrap-date-picker'))
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
        const keysComponent = ['ngModel', 'maxDate', 'minDate', 'initOnSelected', 'confirmSelection', 'select', 'selectDateChange', 'events'];
        keysComponent.map(key => componentRef.instance[key] = component[key]);
        componentRef.instance.cancel.subscribe(() => this.closePicker());
        componentRef.instance.updateMonth.subscribe(() => this.setCoordinate(this.componentElement));
        component.chosen.subscribe(value => componentRef.instance.ngOnChanges(value));
        componentRef.instance.chosen.subscribe(value => {
            this.referencesService.updateModel(this.datePickerCaller, value);
            if (this.pickerOpen) {
                this.inputElement.focus();
                this.closePicker();
            }
        });
    }

    public renderViewCalendar(element, themeClass): void {
        this.wrapDatePicker = document.createElement('div');
        this.wrapDatePicker.classList.add('wrap-date-picker');
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        if (themeClass) {
            this.wrapDatePicker.classList.add(themeClass);
        }

        this.wrapDatePicker.style.transform = 'scale(0)';
        element.classList.add('portrait-only');
        this.wrapDatePicker.appendChild(overlay);
        this.wrapDatePicker.appendChild(element);
        document.body.appendChild(this.wrapDatePicker);

        this.setCoordinate(element);
    }

    public renderDatePicker(component): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UiCalendarComponent);
        this.componentRef = componentFactory.create(this.injector);
        this.componentElement = this.getComponentAsElement(this.componentRef);

        this.setInstances(component, this.componentRef);
        this.applicationRef.attachView(this.componentRef.hostView);
        this.renderViewCalendar(this.componentElement, component.themeClass);
        this.pickerOpen = true;
    }

    public closePicker(): void {
        this.wrapDatePicker.classList.remove('open');
        setTimeout(() => {
            this.pickerOpen = false;
            this.applicationRef.detachView(this.componentRef.hostView);
            document.body.style.overflowY = '';
            try {
                document.body.removeChild(this.wrapDatePicker);
            } catch (e) {
            }
        }, 280);
    }

    private setCoordinate(element) {
        const position = UiElement.position(this.inputElement);
        const coordinate = {
            x: position.left,
            y: this.inputElement.offsetHeight + position.top
        };

        setTimeout(() => {
            const pickerHorizontalCoveringArea = coordinate.x + element.clientWidth;
            const pickerVerticalCoveringArea = coordinate.y + element.clientHeight;
            const windowWidth = window.innerWidth + (document.body.scrollLeft || window.scrollX || window.pageXOffset);
            const windowHeight = window.innerHeight + (document.body.scrollTop || window.scrollY || window.pageYOffset);

            if (pickerHorizontalCoveringArea > windowWidth) {
                coordinate.x = windowWidth - (element.clientWidth + 8);
            }
            if (pickerVerticalCoveringArea > windowHeight) {
                coordinate.y = windowHeight - (element.clientHeight + 8);
            }

            this.wrapDatePicker.style.transform = '';
            element.style.position = 'absolute';
            element.style.top = coordinate.y + 'px';
            element.style.left = coordinate.x + 'px';

            this.wrapDatePicker.classList.add('open');
            if (document.body.clientWidth <= 600) {
                document.body.style.overflowY = 'hidden';
            }
        });
    }
}
