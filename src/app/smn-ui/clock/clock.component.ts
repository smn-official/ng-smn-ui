import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver, ElementRef,
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
import {explosionAnimation, fadeAnimation} from './clock.animations';
import {UiElement} from '../utils/providers/element.provider';

@Component({
    selector: 'ui-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [explosionAnimation, fadeAnimation]
})
export class UiClockComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() ngModel: any;
    @Input('hide-header') hideHeader: boolean;
    @Input('confirm-selection') confirmSelection: boolean;
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    chosen: Subject<any> = new Subject();

    hours: number[];
    minutes: number[];
    hour: number;
    minute: number;
    focused: boolean;
    pointerRotation: number;
    activeSelection: string;

    constructor(private element: ElementRef) {
        const beforeMidday = Array.apply(null, {length: 12}).map(Number.call, Number);
        const afterMidday = Array.apply(null, {length: 12}).map(Number.call, Number).map(val => val + 12);
        beforeMidday[0] = 12;
        afterMidday[0] = 0;
        this.hours = [...afterMidday, ...beforeMidday];
        this.minutes = Array.apply(null, {length: 12}).map(Number.call, Number).map(val => val * 5);
        this.activeSelection = 'hours';
        this.pointerRotation = 0;
    }

    public ngOnInit(): void {
        this.formatModel();
    }

    public ngAfterViewInit(): void {
        this.element.nativeElement.tabIndex = 1;
        setTimeout(() => {
            this.element.nativeElement.focus();
        });

        UiElement.on(document, 'keydown', e => {
            if (!this.focused) {
                return;
            }
            switch (e.keyCode) {
                case 13:
                    if (this.activeSelection === 'hours') {
                        this.selectHour(this.hour);
                    } else {
                        this.selectMinute(this.minute);
                    }
                    break;
                case 39:
                case 40:
                    if (this.activeSelection === 'hours') {
                        this.hour = this.hour + 1 > 23 ? 0 : this.hour + 1;
                    } else {
                        this.minute = this.minute + 1 > 59 ? 0 : this.minute + 1;
                    }
                    this.getPositionPointer();
                    e.preventDefault();
                    break;
                case 37:
                case 38:
                    if (this.activeSelection === 'hours') {
                        this.hour = this.hour - 1 < 0 ? 23 : this.hour - 1;
                    } else {
                        this.minute = this.minute - 1 < 0 ? 59 : this.minute - 1;
                    }
                    this.getPositionPointer();
                    e.preventDefault();
                    break;
            }

        });

        UiElement.on(document, 'click', e => {
            this.focused = (this.element.nativeElement === e.target || this.element.nativeElement === UiElement.closest(e.target, 'ui-clock')) && (UiElement.is(e.target, 'ui-clock') || UiElement.closest(e.target, 'ui-clock'));
        });
    }

    public ngOnChanges(value): void {
        if (value.ngModel && !value.ngModel.firstChange) {
            this.ngModel = value.ngModel.currentValue;
            this.formatModel();
        }
        if (value.confirmSelection) {
            this.confirmSelection = value.confirmSelection.currentValue;
        }
    }

    public formatModel() {
        if (this.ngModel) {
            const time = this.ngModel.split(':');
            this.hour = parseInt(time[0], 10);
            this.minute = parseInt(time [1], 10);
            this.getPositionPointer();
        }
    }

    public selectTime(close?: boolean) {
        if (this.hasHourAndMinute()) {
            this.ngModel = `${this.formatToLpad(this.hour)}:${this.formatToLpad(this.minute)}`;
            this.ngModelChange.emit(this.ngModel);
            this.select.emit(this.ngModel);
            this.chosen.next({value: this.ngModel, close});
        }
    }

    public cancelTime() {
        this.activeSelection = 'hours';
        this.hour = null;
        this.minute = null;
        this.ngModel = null;
        this.ngModelChange.emit(this.ngModel);
        this.cancel.emit();
    }

    public selectHour(hour): void {
        this.activeSelection = 'minutes';
        this.hour = hour;
        this.minute = this.minute || 0;
        this.getPositionPointer();

        if (!this.confirmSelection) {
            this.selectTime();
        }
    }

    public selectMinute(minute): void {
        this.activeSelection = 'hours';
        this.minute = minute;
        this.getPositionPointer();

        if (!this.confirmSelection) {
            this.selectTime(true);
        }
    }

    public isEmpty(): boolean {
        return !(typeof this.hour === 'number' && typeof this.minute === 'number');
    }

    public formatToLpad(value): string {
        if (typeof value === 'number' && value.toString().length < 2) {
            value = `0${value}`;
        }

        return value;
    }

    public getPositionPointer(): void {
        if (!this.hasHourAndMinute()) {
            return;
        }
        let oldRotation = this.pointerRotation;
        oldRotation = oldRotation >= 360 ? oldRotation - (Math.floor(oldRotation / 360) * 360) : (oldRotation <= -360 ? oldRotation + (Math.floor(Math.abs(oldRotation) / 360) * 360) : oldRotation);
        let amountRotate;
        const actualRotate = this.activeSelection === 'hours' ? (30 * (this.hour >= 12 ? this.hour - 12 : this.hour)) : 6 * this.minute;

        if (actualRotate - oldRotation < -180) {
            amountRotate = 360 - oldRotation + actualRotate;
        } else if (actualRotate - oldRotation > 180) {
            amountRotate = -(360 - actualRotate + oldRotation);
        } else {
            amountRotate = actualRotate - oldRotation;
        }

        if (Math.abs(amountRotate) === 180) {
            amountRotate = actualRotate > oldRotation ? Math.abs(amountRotate) : -amountRotate;
        }

        this.pointerRotation += amountRotate;

    }

    public getPositionTopPointer(): string {
        if (this.activeSelection === 'hours' && this.hour > 0 && this.hour < 13) {
            return '40px';
        }

        return '';
    }

    public hasHourAndMinute(): boolean {
        return typeof this.hour === 'number' && typeof this.minute === 'number';
    }

    public validate(): boolean {
        return (this.hour < 24 && this.minute < 60) || !this.hasHourAndMinute();
    }
}
