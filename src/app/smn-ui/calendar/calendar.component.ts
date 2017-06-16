import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    Input,
    Output,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    OnChanges,
    EventEmitter
} from '@angular/core';
import {CalendarContentComponent} from './calendar-content.component';
import {AddCalendarDirective} from './add-calendar.directive';
import {DatetimeService} from './datetime.service';

@Component({
    selector: 'ui-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() model: any;
    @Input() maxDate: Date;
    @Input() minDate: Date;
    @Input() initOnSelected: Date;
    @Input() confirmSelection: boolean;
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() modelChange: EventEmitter<any> = new EventEmitter();
    @ViewChild(AddCalendarDirective) addCalendar: AddCalendarDirective;

    calendar: any;
    days: any;
    shortDays: any;
    months: any;
    viewDate: Date;
    chosenDate: any;
    componentRef;

    constructor(public componentFactoryResolver: ComponentFactoryResolver, public datetimeService: DatetimeService) {
        this.days = datetimeService.days;
        this.shortDays = datetimeService.shortDays;
        this.months = datetimeService.months;
    }

    ngOnInit(): void {
        this.chosenDate = this.model;
        this.model = this.model ? new Date(this.model) : this.model;
        this.viewDate = this.model || this.initOnSelected || new Date();
    }

    ngOnChanges(value): void {
        if (value.model && !value.model.firstChange) {
            this.model = this.chosenDate = this.componentRef.instance.chosenDate = this.componentRef.instance.model = value.model.currentValue;
        }
        if (value.maxDate && !value.maxDate.firstChange) {
            this.componentRef.instance.maxDate = this.maxDate = value.maxDate.currentValue;
        }
        if (value.minDate && !value.minDate.firstChange) {
            this.componentRef.instance.minDate = this.minDate = value.minDate.currentValue;
        }
        if (value.confirmSelection) {
            this.confirmSelection = value.confirmSelection.currentValue;
        }
    }

    ngAfterViewInit(): void {
        this.model = this.model ? new Date(this.model) : this.model;
        this.viewDate = this.model || this.initOnSelected || new Date();
        this.renderCalendar(this.viewDate);
    }

    prevMonth(): void {
        this.viewDate.setMonth(this.viewDate.getMonth() - 1);
        this.renderCalendar(this.viewDate);
    }

    nextMonth(): void {
        this.viewDate.setMonth(this.viewDate.getMonth() + 1);
        this.renderCalendar(this.viewDate);
    }

    selectDate(value) {
        this.model = this.componentRef.instance.model = value;
        this.modelChange.emit(this.model);
        this.select.emit(this.model);
    }

    cancel() {
        this.model = this.chosenDate = this.componentRef.instance.model = this.componentRef.instance.chosenDate = null;
        this.modelChange.emit(this.model);
    }

    renderCalendar(dateTarget: Date): void {
        let date: Date = dateTarget;

        date.setHours(0, 0, 0, 0);
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);

        this.viewDate = date;

        const calendar: any = {
            year: date.getFullYear(),
            month: date.getMonth(),
            monthDays: date.getDate(),
            lastDayWeek: date.getDay(),
            lastDayWeekName: this.days[date.getDay()]
        };

        date.setDate(1);
        calendar.firstDayWeek = date.getDay();
        calendar.firstDayWeekName = this.days[date.getDay()];
        calendar.totalDays = calendar.monthDays + calendar.firstDayWeek + (6 - calendar.lastDayWeek);
        calendar.days = [];

        const firstDate = -calendar.firstDayWeek + 1;
        const lastDate = calendar.monthDays + (7 - calendar.lastDayWeek);

        for (let i = firstDate; i < lastDate; i++) {
            date = new Date(calendar.year, calendar.month, i);
            let today: any = new Date();
            today = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
            calendar.days.push({
                month: date.getMonth(),
                date: date.getDate(),
                value: date,
                time: date.getTime(),
                today: today
            });
        }

        this.calendar = calendar;

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CalendarContentComponent);
        const viewContainerRef = this.addCalendar.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentRef.instance.calendar = calendar;
        this.componentRef.instance.model = this.model;
        this.componentRef.instance.minDate = this.minDate;
        this.componentRef.instance.maxDate = this.maxDate;
        this.componentRef.instance.chosenDate = this.chosenDate;
        this.componentRef.instance.confirmSelection = this.confirmSelection;
        this.componentRef.instance.chosen.subscribe(newValue => {
            if (newValue) {
                this.chosenDate = newValue.value;
                if (!newValue.confirmSelection) {
                    this.selectDate(newValue.value);
                }
            }
        });
    }

}
