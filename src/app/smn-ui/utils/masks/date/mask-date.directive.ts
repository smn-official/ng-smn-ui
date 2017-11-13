import {
    AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges,
    Output
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {UiElement} from '../../providers/element.provider';
import {checkDate} from './check-date';
import {isDate} from 'rxjs/util/isDate';

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
export class UiMaskDateDirective implements ControlValueAccessor, Validator, OnChanges, AfterViewInit {

    loaded: boolean;
    input: boolean;
    beforeSelIndex;
    onChange: Function;
    onTouched: Function;
    control: any;
    symbolsPositions: number[] = [2, 5];
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public datePipe: DatePipe) {
    }

    ngAfterViewInit() {
        this.minDate = this.minDate && isDate(new Date(this.minDate)) ? new Date(this.minDate) : this.minDate;
        this.maxDate = this.maxDate && isDate(new Date(this.maxDate)) ? new Date(this.maxDate) : this.maxDate;
        setTimeout(() => {
            this.loaded = true;
        });
    }

    writeValue(rawValue: any): void {
        if (this.control && this.loaded && rawValue) {
            this.control.markAsDirty();
        }
        if (!this.input) {
            this.elementRef.nativeElement.value = this.format(this.datePipe.transform(this.ngModel, 'dd/MM/yyyy'));
        }
        this.input = false;
    }

    renderViaInput(rawValue: any): void {
        if (rawValue) {
            this.control.markAsDirty();
        }
        this.ngModel = checkDate(this.format(rawValue)) || this.format(rawValue);
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.format(this.elementRef.nativeElement.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    format(date: string): string {
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
        if (changes.ngModel && !changes.ngModel.firstChange && (changes.ngModel.currentValue === null || changes.ngModel.currentValue === undefined)) {
            this.elementRef.nativeElement.value = '';
        }
        if (changes.minDate && !changes.minDate.firstChange) {
            this.minDate = changes.minDate.currentValue && isDate(new Date(this.minDate)) ? new Date(this.minDate) : this.minDate;
        }
        if (changes.maxDate && !changes.maxDate.firstChange) {
            this.maxDate = changes.maxDate.currentValue && isDate(new Date(this.maxDate)) ? new Date(this.maxDate) : this.maxDate;
        }
        if ((changes.minDate && !changes.minDate.firstChange) || (changes.maxDate && !changes.maxDate.firstChange)) {
            this.control.updateValueAndValidity(this.control);
        }
    }

    validate(control: FormControl): { [key: string]: any } {
        this.control = control;
        const value = this.elementRef.nativeElement.value;
        const dateControl = isDate(control.value) ? control.value : new Date(control.value);

        if (value && !checkDate(value)) {
            return {parse: true};
        } else if (checkDate(value)) {
            dateControl.setHours(0, 0, 0, 0);

            if (this.minDate && isDate(this.minDate)) {
                this.minDate.setHours(0, 0, 0, 0);

                if (dateControl.getTime() < this.minDate.getTime()) {
                    return {minDate: true};
                }
            }
            if (this.maxDate && isDate(this.maxDate)) {
                this.maxDate.setHours(0, 0, 0, 0);

                if (dateControl.getTime() > this.maxDate.getTime()) {
                    return {maxDate: true};
                }
            }
        }

        return null;
    }

    setDisabledState(isDisabled: boolean) {
        const method = isDisabled ? 'setAttribute' : 'removeAttribute';
        this.elementRef.nativeElement[method]('disabled', 'disabled');
    }

    @HostListener('keydown')
    onKeydown() {
        this.beforeSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
    }

    @HostListener('input', ['$event'])
    onInput($event): void {
        const afterSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
        const rawValue: string = this.elementRef.nativeElement.value;
        this.input = true;
        this.renderViaInput(rawValue);
        UiElement.caretPosition.set(this.elementRef.nativeElement, this.beforeSelIndex, afterSelIndex, this.symbolsPositions);
    }
}
