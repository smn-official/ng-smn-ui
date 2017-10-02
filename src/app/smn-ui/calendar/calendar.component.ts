import {
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {UiCalendarContentComponent} from './calendar-content.component';
import {UiAddCalendarDirective} from './add-calendar.directive';
import {UiDatetimeService} from './datetime.service';
import {Subject} from 'rxjs/Subject';
import {isDate} from 'rxjs/util/isDate';

@Component({
    selector: 'ui-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiCalendarComponent implements OnInit, OnChanges {
    @Input() ngModel: any;
    @Input() maxDate: Date;
    @Input() minDate: Date;
    @Input() hideHeader: boolean;
    @Input() initOnSelected: Date;
    @Input() confirmSelection: boolean;
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    @ViewChild(UiAddCalendarDirective) addCalendar: UiAddCalendarDirective;
    chosen: Subject<any> = new Subject();

    calendar: any;
    days: any;
    shortDays: any;
    months: any;
    viewDate: Date;
    chosenDate: any;
    componentRef;

    constructor(public componentFactoryResolver: ComponentFactoryResolver, public datetimeService: UiDatetimeService) {
        this.days = datetimeService.days;
        this.shortDays = datetimeService.shortDays;
        this.months = datetimeService.months;
    }

    ngOnInit(): void {
        this.minDate = this.minDate && isDate(new Date(this.minDate)) ? new Date(this.minDate) : this.minDate;
        this.maxDate = this.maxDate && isDate(new Date(this.maxDate)) ? new Date(this.maxDate) : this.maxDate;
        this.chosenDate = this.ngModel && isDate(new Date(this.ngModel)) ? new Date(this.ngModel) : null;
        this.ngModel = this.ngModel && isDate(new Date(this.ngModel)) ? new Date(this.ngModel) : this.ngModel;
        this.viewDate = isDate(this.ngModel) ? this.ngModel : this.initOnSelected || new Date();
        this.renderCalendar(this.viewDate);

    }

    public ngOnChanges(value): void {
        if (value.ngModel && !value.ngModel.firstChange && !isNaN(value.ngModel.currentValue)) {
            const ngModel = value.ngModel.currentValue = value.ngModel.currentValue && isDate(new Date(value.ngModel.currentValue)) ? new Date(value.ngModel.currentValue) : value.ngModel.currentValue;
            this.ngModel = this.chosenDate = this.componentRef.instance.chosenDate = this.componentRef.instance.ngModel = ngModel;
        }
        if (value.maxDate && !value.maxDate.firstChange) {
            const maxDate = value.maxDate.currentValue = value.maxDate.currentValue && isDate(new Date(value.maxDate.currentValue)) ? new Date(value.maxDate.currentValue) : value.maxDate.currentValue;
            this.componentRef.instance.maxDate = this.maxDate = maxDate;
        }
        if (value.minDate && !value.minDate.firstChange) {
            const minDate = value.minDate.currentValue = value.minDate.currentValue && isDate(new Date(value.minDate.currentValue)) ? new Date(value.minDate.currentValue) : value.minDate.currentValue;
            this.componentRef.instance.minDate = this.minDate = minDate;
        }
        if (value.confirmSelection) {
            this.confirmSelection = value.confirmSelection.currentValue;
        }
    }

    public prevMonth(): void {
        this.viewDate.setMonth(this.viewDate.getMonth() - 1);
        this.renderCalendar(this.viewDate);
    }

    public nextMonth(): void {
        this.viewDate.setMonth(this.viewDate.getMonth() + 1);
        this.renderCalendar(this.viewDate);
    }

    public selectDate(value) {
        this.ngModel = this.componentRef.instance.ngModel = value;
        this.ngModelChange.emit(this.ngModel);
        this.select.emit(this.ngModel);
        this.chosen.next(this.ngModel);
    }

    public cancelDate() {
        this.ngModel = this.chosenDate = this.componentRef.instance.ngModel = this.componentRef.instance.chosenDate = null;
        this.cancel.emit();
        this.ngModelChange.emit(this.ngModel);
    }

    public renderCalendar(dateTarget: Date): void {
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

        const keysComponent = ['calendar', 'ngModel', 'minDate', 'maxDate', 'chosenDate', 'confirmSelection'];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UiCalendarContentComponent);
        const viewContainerRef = this.addCalendar.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        keysComponent.map(key => this.componentRef.instance[key] = this[key]);

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
