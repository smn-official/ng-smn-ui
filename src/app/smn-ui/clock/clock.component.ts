import {
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {UiClockContentComponent} from './clock-content.component';
import {UiAddClockDirective} from './add-clock.directive';
import {Subject} from 'rxjs/Subject';
import {isDate} from 'rxjs/util/isDate';

@Component({
    selector: 'ui-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiClockComponent implements OnInit, OnChanges {
    @Input() ngModel: any;
    @Input() hideHeader: boolean;
    @Input('confirm-selection') confirmSelection: boolean;
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    @ViewChild(UiAddClockDirective) addClock: UiAddClockDirective;
    chosen: Subject<any> = new Subject();

    clock: any;
    days: any;
    hours: any;
    minutes: any;
    shortDays: any;
    months: any;
    viewDate: Date;
    chosenDate: any;
    componentRef;

    constructor(public componentFactoryResolver: ComponentFactoryResolver) {
        const beforeMidday = Array.apply(null, {length: 12}).map(Number.call, Number);
        const afterMidday = Array.apply(null, {length: 12}).map(Number.call, Number).map(val => val + 12);
        beforeMidday[0] = 12;
        afterMidday[0] = 0;
        this.hours = [...afterMidday, ...beforeMidday];
        this.minutes = Array.apply(null, {length: 12}).map(Number.call, Number).map(val => val * 5);
    }

    ngOnInit(): void {
        this.chosenDate = isDate(this.ngModel) ? this.ngModel : null;
        this.ngModel = this.ngModel ? new Date(this.ngModel) : this.ngModel;
        this.renderClock(this.viewDate);
    }

    public ngOnChanges(value): void {
        if (value.ngModel && !value.ngModel.firstChange && !isNaN(value.ngModel.currentValue)) {
            this.ngModel = this.chosenDate = this.componentRef.instance.chosenDate = this.componentRef.instance.ngModel = value.ngModel.currentValue;
        }
        if (value.confirmSelection) {
            this.confirmSelection = value.confirmSelection.currentValue;
        }
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

    public renderClock(dateTarget: Date): void {
        // let date: Date = dateTarget;
        //
        // date.setHours(0, 0, 0, 0);
        // date.setDate(1);
        // date.setMonth(date.getMonth() + 1);
        // date.setDate(0);
        //
        // this.viewDate = date;
        //
        // const clock: any = {
        //     year: date.getFullYear(),
        //     month: date.getMonth(),
        //     monthDays: date.getDate(),
        //     lastDayWeek: date.getDay(),
        //     lastDayWeekName: this.days[date.getDay()]
        // };
        //
        // date.setDate(1);
        // clock.firstDayWeek = date.getDay();
        // clock.firstDayWeekName = this.days[date.getDay()];
        // clock.totalDays = clock.monthDays + clock.firstDayWeek + (6 - clock.lastDayWeek);
        // clock.days = [];
        //
        // const firstDate = -clock.firstDayWeek + 1;
        // const lastDate = clock.monthDays + (7 - clock.lastDayWeek);
        //
        // for (let i = firstDate; i < lastDate; i++) {
        //     date = new Date(clock.year, clock.month, i);
        //     let today: any = new Date();
        //     today = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
        //     clock.days.push({
        //         month: date.getMonth(),
        //         date: date.getDate(),
        //         value: date,
        //         time: date.getTime(),
        //         today: today
        //     });
        // }
        //
        // this.clock = clock;
        //
        // const keysComponent = ['clock', 'ngModel', 'minDate', 'maxDate', 'chosenDate', 'confirmSelection'];
        // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UiClockContentComponent);
        // const viewContainerRef = this.addClock.viewContainerRef;
        // viewContainerRef.clear();
        // this.componentRef = viewContainerRef.createComponent(componentFactory);
        // keysComponent.map(key => this.componentRef.instance[key] = this[key]);
        //
        // this.componentRef.instance.chosen.subscribe(newValue => {
        //     if (newValue) {
        //         this.chosenDate = newValue.value;
        //         if (!newValue.confirmSelection) {
        //             this.selectDate(newValue.value);
        //         }
        //     }
        // });
    }
}
