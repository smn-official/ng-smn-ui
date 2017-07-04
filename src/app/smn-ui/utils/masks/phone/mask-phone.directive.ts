import {Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {UiPhonePipe} from './phone.pipe';
import {UiElement} from '../../../providers/element.provider';

@Directive({
    selector: '[uiMaskPhone][ngModel]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiMaskPhoneDirective),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UiMaskPhoneDirective),
        multi: true
    }, UiPhonePipe]
})
export class UiMaskPhoneDirective implements ControlValueAccessor, Validator {

    input: boolean;
    beforeSelIndex;
    onChange: Function;
    onTouched: Function;
    control: AbstractControl;
    symbolsPositions: number[] = [0, 9, 11, 14];
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public phonePipe: UiPhonePipe) {
    }

    writeValue(rawValue: any): void {
        if (!this.input) {
            this.elementRef.nativeElement.value = this.phonePipe.transform(this.ngModel);
        }
        this.input = false;
    }

    renderViaInput(rawValue: any): void {
        this.ngModel = this.formart(rawValue);
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.phonePipe.transform(this.elementRef.nativeElement.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    formart(value) {
        value = value.toString().replace(/[^0-9]+/g, '');
        return value.substring(0, 11);
    }

    validate(control: AbstractControl): { [key: string]: any } {

        this.control = control;

        if (control.value && this.formart(control.value).length < 10) {
            return { parse: true };
        }

        return null;
    }

    @HostListener('keydown') onKeydown() {
        this.beforeSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
    }

    @HostListener('input', ['$event']) onInput($event): void {
        let afterSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
        const rawValue: string = this.elementRef.nativeElement.value;
        this.input = true;
        this.renderViaInput(rawValue);

        if (afterSelIndex === 4) {
            this.beforeSelIndex = 5;
            afterSelIndex = 6;

        }

        UiElement.caretPosition.set(this.elementRef.nativeElement, this.beforeSelIndex, afterSelIndex, this.symbolsPositions);
    }

}
