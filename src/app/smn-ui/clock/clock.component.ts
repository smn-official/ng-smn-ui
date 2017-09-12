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
import {Subject} from 'rxjs/Subject';
import {isDate} from 'rxjs/util/isDate';
import {explosionAnimation} from './clock.animations';

@Component({
    selector: 'ui-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [explosionAnimation]
})
export class UiClockComponent implements OnInit, OnChanges {
    @Input() ngModel: any;
    @Input() hideHeader: boolean;
    @Input('confirm-selection') confirmSelection: boolean;
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    chosen: Subject<any> = new Subject();

    hour: number;
    minute: number;
    hours: any;
    minutes: any;
    chosenDate: any;
    activeSelection: string;
    componentRef;

    constructor() {
        const beforeMidday = Array.apply(null, {length: 12}).map(Number.call, Number);
        const afterMidday = Array.apply(null, {length: 12}).map(Number.call, Number).map(val => val + 12);
        beforeMidday[0] = 12;
        afterMidday[0] = 0;
        this.hours = [...afterMidday, ...beforeMidday];
        this.minutes = Array.apply(null, {length: 12}).map(Number.call, Number).map(val => val * 5);
        this.activeSelection = 'hours';
    }

    ngOnInit(): void {
        this.chosenDate = isDate(this.ngModel) ? this.ngModel : null;
        this.ngModel = this.ngModel ? new Date(this.ngModel) : this.ngModel;
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

    public selectHour(hour): void {
        this.activeSelection = 'minutes';
        this.hour = hour;
        this.minute = this.minute || 0;
    }

    public selectMinute(minute): void {
        this.activeSelection = 'hours';
        this.minute = minute;
    }

    public isEmpty(): boolean {
        return !(typeof this.hour === 'number' && typeof this.minute === 'number');
    }

    public formatToLpad(number): string {
        if (typeof number === 'number' && number.toString().length < 2) {
            number = `0${number}`;
        }

        return number;
    }

    public getPositionPointer(): number {
        let position: number;
        switch (this.activeSelection) {
            case 'hours':
                position = this.hour;
                break;
            case 'minutes':
                position = this.minutes.indexOf(this.minute);
                break;
        }

        return typeof position === 'number' ? (30 * (position >= 12 ? position - 12 : position)) : null;
    }
}
