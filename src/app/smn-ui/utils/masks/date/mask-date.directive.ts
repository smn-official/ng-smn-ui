import {Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, Output} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {UiElement} from '../../../providers/element.provider';
import {checkDate} from './check-date';

@Directive({
    selector: '[uiMaskDate][ngModel]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiMaskDateDirective),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UiMaskDateDirective),
        multi: true
    }, DatePipe]
})
export class UiMaskDateDirective implements ControlValueAccessor, Validator, OnChanges {

    input: boolean;
    onChange: Function;
    onTouched: Function;
    beforeSelIndex;
    symbolsPositions: number[] = [2, 5];
    control: AbstractControl;
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public datePipe: DatePipe) {
    }

    writeValue(rawValue: any): void {
        if (!this.input) {
            this.elementRef.nativeElement.value = this.formatDate(this.datePipe.transform(this.ngModel, 'dd/MM/yyyy'));
        }
        this.input = false;
    }

    render(rawValue: any): void {
        this.ngModel = checkDate(this.formatDate(rawValue));
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.formatDate(this.elementRef.nativeElement.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    formatDate(date: string): string {
        if (!date) {
            return '';
        }

        date = date.toString().replace(/[^0-9]+/g, '');
        if (date.length > this.symbolsPositions[0]) {
            date = date.substring(0, 2) + '/' + date.substring(2);
        }
        if (date.length > this.symbolsPositions[1]) {
            date = date.substring(0, 5) + '/' + date.substring(5, 9);
        }
        return date;
    }

    ngOnChanges(changes): void {
        if ((changes.minDate && !changes.minDate.firstChange) || (changes.maxDate && !changes.maxDate.firstChange)) {
            this.control.updateValueAndValidity(this.control);
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {

        this.control = control;
        const value = this.elementRef.nativeElement.value;
        const dateControl = control.value;

        if (value && !checkDate(value)) {
            return { parse: true };
        } else if (checkDate(value)) {
            dateControl.setHours(0, 0, 0, 0);

            if (this.minDate) {
                this.minDate.setHours(0, 0, 0, 0);

                if (dateControl.getTime() < this.minDate.getTime()) {
                    return { minDate: true };
                }
            }
            if (this.maxDate) {
                this.maxDate.setHours(0, 0, 0, 0);

                if (dateControl.getTime() > this.maxDate.getTime()) {
                    return { maxDate: true };
                }
            }
        }

        return null;
    }

    @HostListener('keydown') onKeydown() {
        this.beforeSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
    }

    @HostListener('input', ['$event']) onInput($event): void {
        const afterSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
        const rawValue: string = this.elementRef.nativeElement.value;
        this.input = true;
        this.render(rawValue);
        UiElement.caretPosition.set(this.elementRef.nativeElement, this.beforeSelIndex, afterSelIndex, this.symbolsPositions);
    }
}
