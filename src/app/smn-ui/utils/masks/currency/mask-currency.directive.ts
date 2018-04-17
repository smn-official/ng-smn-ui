import {
    AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges,
    Output
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {UiElement} from '../../providers/element.provider';
import {UiCurrencyPipe} from './currency.pipe';

@Directive({
    selector: '[uiMaskCurrency][ngModel]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiMaskCurrencyDirective),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UiMaskCurrencyDirective),
        multi: true
    }, UiCurrencyPipe]
})
export class UiMaskCurrencyDirective implements ControlValueAccessor, Validator, AfterViewInit, OnChanges {

    loaded: boolean;
    input: boolean;
    beforeViewValue;
    beforeSelIndex;
    onChange: Function;
    onTouched: Function;
    control: FormControl;
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    @Input() min: number;
    @Input() max: number;

    constructor(public elementRef: ElementRef, public currencyPipe: UiCurrencyPipe) {
    }

    ngOnChanges(changes): void {
        if (changes.ngModel && !changes.ngModel.firstChange && (changes.ngModel.currentValue === null || changes.ngModel.currentValue === undefined)) {
            this.elementRef.nativeElement.value = '';
        }
        if (typeof changes.max !== 'undefined') {
            this.max = changes.max.currentValue;
        }
        if (typeof changes.min !== 'undefined') {
            this.min = changes.min.currentValue;
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
            this.elementRef.nativeElement.value = this.formatViewValue(this.ngModel);
        }
        this.input = false;
    }

    renderViaInput(rawValue: any): void {
        if (rawValue) {
            this.control.markAsDirty();
        }
        this.ngModel = this.format(rawValue);
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.formatViewValue(this.elementRef.nativeElement.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    format(value) {
        value = this.currencyPipe.transform(value);
        const removeGroupSep = new RegExp('[^\\d\\,-]+', 'g');
        value = value.toString().replace(removeGroupSep, '');
        value = parseFloat(value.replace(',', '.'));
        return typeof value === 'number' ? value : null;
    }

    formatViewValue(value) {
        const isDeletingZero = this.beforeViewValue === ('0,00') && value.length < this.beforeViewValue.length;
        value = isDeletingZero ? '' : value;
        return this.currencyPipe.transform(value);
    }

    validate(control: FormControl): { [key: string]: any } {

        this.control = control;

        // if (control.value && this.format(control.value).length < 11) {
        //     return {parse: true};
        // }

        if (typeof this.min !== 'undefined' && control.value && this.format(control.value) < this.min) {
            return {min: true};
        }

        if (typeof this.max !== 'undefined' && control.value && this.format(control.value) > this.max) {
            return {max: true};
        }

        return null;
    }

    setDisabledState(isDisabled: boolean) {
        const method = isDisabled ? 'setAttribute' : 'removeAttribute';
        this.elementRef.nativeElement[method]('disabled', 'disabled');
    }

    @HostListener('keydown') onKeydown() {
        this.beforeSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
    }

    @HostListener('input', ['$event']) onInput($event): void {
        // const afterSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
        const rawValue: string = this.elementRef.nativeElement.value;
        this.input = true;
        this.beforeViewValue = rawValue;
        this.renderViaInput(rawValue);
        // UiElement.caretPosition.set(this.elementRef.nativeElement, this.beforeSelIndex, afterSelIndex, this.symbolsPositions);
    }

}
