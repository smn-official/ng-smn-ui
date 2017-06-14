import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {CalendarContentComponent} from './calendar-content.component';
import {AddCalendarDirective} from './add-calendar.directive';

@Component({
    selector: 'ui-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, AfterViewInit {
    @Input() ngModel: Date;
    @Input() initOnSelected: Date;
    @ViewChild(AddCalendarDirective) addCalendar: AddCalendarDirective;

    days: any;
    shortDays: any;
    months: any;
    shortMonths: any;
    viewDate: Date;
    chosenDate: any;
    confirmSelection = true;
    componentRef;

    constructor(public componentFactoryResolver: ComponentFactoryResolver) {
        this.days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
        this.shortDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
        this.months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        this.shortMonths = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dec'];
    }

    ngOnInit(): void {
        this.chosenDate = this.ngModel;
        this.ngModel = this.ngModel ? new Date(this.ngModel) : this.ngModel;
        this.viewDate = this.ngModel || this.initOnSelected || new Date();
    }

    ngAfterViewInit(): void {
        this.ngModel = this.ngModel ? new Date(this.ngModel) : this.ngModel;
        this.viewDate = this.ngModel || this.initOnSelected || new Date();
        this.renderCalendar(this.viewDate);
    }

    renderCalendar(dateTarget: Date, isPrev?: boolean): void {
        let date: Date = dateTarget;

        date.setHours(0, 0, 0, 0);
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);

        this.viewDate = date;

        const info: any = {
            year: date.getFullYear(),
            month: date.getMonth(),
            monthDays: date.getDate(),
            lastDayWeek: date.getDay(),
            lastDayWeekName: this.days[date.getDay()]
        };

        date.setDate(1);
        info.firstDayWeek = date.getDay();
        info.firstDayWeekName = this.days[date.getDay()];
        info.totalDays = info.monthDays + info.firstDayWeek + (6 - info.lastDayWeek);
        info.days = [];

        const firstDate = -info.firstDayWeek + 1;
        const lastDate = info.monthDays + (7 - info.lastDayWeek);

        for (let i = firstDate; i < lastDate; i++) {
            date = new Date(info.year, info.month, i);
            let today: any = new Date();
            today = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
            info.days.push({
                month: date.getMonth(),
                date: date.getDate(),
                value: date,
                time: date.getTime(),
                today: today
            });
        }

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CalendarContentComponent);
        const viewContainerRef = this.addCalendar.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentRef.instance.info = info;
        this.componentRef.instance.prev = isPrev;
        this.componentRef.instance.ngModel = this.ngModel;
        this.componentRef.instance.chosenDate = this.chosenDate;
        this.componentRef.instance.confirmSelection = this.confirmSelection;
        this.componentRef.instance.chosen.subscribe(newValue => {
            if (newValue) {
                this.chosenDate = newValue.value;
                if (!newValue.confirmSelection) {
                    this.selectDate(newValue.value);
                }
                console.log(this);
            }
        });
    }

    prevMonth(): void {
        this.viewDate.setMonth(this.viewDate.getMonth() - 1);
        this.renderCalendar(this.viewDate, true);
    }

    nextMonth(): void {
        this.viewDate.setMonth(this.viewDate.getMonth() + 1);
        this.renderCalendar(this.viewDate);
    }

    formatDate(date: Date): string {
        return `${this.shortDays[date.getDay()]}, ${date.getDate()} de ${this.months[date.getMonth()]}`;
    }

    selectDate(value) {
        this.ngModel = value;
        this.componentRef.instance.ngModel = this.ngModel;
    }

    cancel() {
        this.ngModel = this.chosenDate = this.componentRef.instance.ngModel = this.componentRef.instance.chosenDate = null;
    }
}
