import {Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, AfterViewInit, OnChanges} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {UiTimePipe} from './time.pipe';
import {UiElement} from '../../providers/element.provider';

@Directive({
    selector: '[uiMaskTime][ngModel]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiMaskTimeDirective),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UiMaskTimeDirective),
        multi: true
    }, UiTimePipe]
})
export class UiMaskTimeDirective implements ControlValueAccessor, Validator, AfterViewInit, OnChanges {

    loaded: boolean;
    input: boolean;
    beforeSelIndex;
    onChange: Function;
    onTouched: Function;
    control: FormControl;
    symbolsPositions: number[] = [2];
    @Input() ngModel: any;
    @Input() minTime: string;
    @Input() maxTime: string;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public timePipe: UiTimePipe) {
    }

    ngOnChanges(changes): void {
        if (changes.ngModel && !changes.ngModel.firstChange && (changes.ngModel.currentValue === null || changes.ngModel.currentValue === undefined)) {
            this.elementRef.nativeElement.value = '';
        }
        if (changes.minTime && !changes.minTime.firstChange) {
            this.minTime = changes.minTime.currentValue;
        }
        if (changes.maxTime && !changes.maxTime.firstChange) {
            this.maxTime = changes.maxTime.currentValue;
        }
    }

    ngAfterViewInit() {
       setTimeout(() => {
            this.loaded = true;
       });
    }

    writeValue(rawValue: any): void {
        if (this.control && this.loaded && rawValue) {
            this.control.markAsDirty();
        }
        if (!this.input) {
            this.elementRef.nativeElement.value = this.timePipe.transform(this.ngModel);
        }
        this.input = false;
    }

    renderViaInput(rawValue: any): void {
        if (rawValue) {
            this.control.markAsDirty();
        }
        this.ngModel = this.timePipe.transform(rawValue);
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.timePipe.transform(this.elementRef.nativeElement.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    format(value) {
        value = value.toString().replace(/[^0-9]+/g, '');
        return value.substring(0, 4);
    }

    validate(control: FormControl): { [key: string]: any } {

        this.control = control;

        if (control.value && this.format(control.value).length < 4) {
            return {parse: true};
        }

        if (control.value) {
            const time = control.value.split(':');

            if (time[0] > 23) {
                return {hour: true};
            }

            if (time[1] > 59) {
                return {minute: true};
            }

            if (this.minTime && this.format(this.minTime).length === 4 && this.format(control.value) < this.format(this.minTime)) {
                return {minTime: true};
            }

            if (this.maxTime && this.format(this.maxTime).length === 4 && this.format(control.value) > this.format(this.maxTime)) {
                return {maxTime: true};
            }

        }

        return null;
    }

    @HostListener('keydown') onKeydown() {
        this.beforeSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
    }

    @HostListener('input') onInput(): void {
        const afterSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
        const rawValue: string = this.elementRef.nativeElement.value;
        this.input = true;
        this.renderViaInput(rawValue);
        UiElement.caretPosition.set(this.elementRef.nativeElement, this.beforeSelIndex, afterSelIndex, this.symbolsPositions);
    }

}
