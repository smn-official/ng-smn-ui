import {
    AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input,
    Output, OnChanges, OnInit
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import { UiElement } from '../../providers/element.provider';
import { UiFloatPipe } from './float.pipe';

@Directive({
    selector: '[uiMaskFloat][ngModel]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiMaskFloatDirective),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UiMaskFloatDirective),
        multi: true
    }, UiFloatPipe]
})
export class UiMaskFloatDirective implements ControlValueAccessor, AfterViewInit, OnChanges {

    loaded: boolean;
    input: boolean;
    beforeViewValue;
    beforeSelIndex;
    onChange: Function;
    onTouched: Function;
    control: FormControl;
    @Input() decimal: number;
    @Input() max: number;
    @Input() min: number;
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public floatPipe: UiFloatPipe) {
    }

    ngOnChanges(changes): void {
        if (changes.ngModel && !changes.ngModel.firstChange && (changes.ngModel.currentValue === null || changes.ngModel.currentValue === undefined)) {
            this.elementRef.nativeElement.value = '';
        }
        if (typeof changes.decimal !== 'undefined') {
            this.decimal = changes.decimal.currentValue;
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
        value = this.floatPipe.transform(value, +this.decimal);
        const removeGroupSep = new RegExp('[^\\d\\,-]+', 'g');
        value = value.toString().replace(removeGroupSep, '');
        value = parseFloat(value.replace(',', '.'));
        return typeof value === 'number' && !isNaN(value) ? value : null;
    }

    formatViewValue(value) {
        let standard = '0,';
        standard = standard.padEnd(+this.decimal + 2, '0');
        const isDeletingZero = this.beforeViewValue === (standard) && value.length < this.beforeViewValue.length;
        value = isDeletingZero ? '' : value;
        return this.floatPipe.transform(value, +this.decimal);
    }

    validate(control: FormControl): { [key: string]: any } {
        this.control = control;

        if (typeof this.min !== 'undefined' && control.value && this.format(control.value) < this.min) {
            return { min: true };
        }

        if (typeof this.max !== 'undefined' && control.value && this.format(control.value) > this.max) {
            return { max: true };
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
        const rawValue: string = this.elementRef.nativeElement.value;
        this.input = true;
        this.beforeViewValue = rawValue;
        this.renderViaInput(rawValue);
    }

}
