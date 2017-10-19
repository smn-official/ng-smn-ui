import {
    AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges,
    Output
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {UiCnpjPipe} from './cnpj.pipe';
import {UiElement} from '../../providers/element.provider';

@Directive({
    selector: '[uiMaskCnpj][ngModel]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiMaskCnpjDirective),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UiMaskCnpjDirective),
        multi: true
    }, UiCnpjPipe]
})
export class UiMaskCnpjDirective implements ControlValueAccessor, Validator, AfterViewInit, OnChanges {

    loaded: boolean;
    input: boolean;
    beforeSelIndex;
    onChange: Function;
    onTouched: Function;
    control: FormControl;
    symbolsPositions: number[] = [2, 6, 10, 15, 18];
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public cnpjPipe: UiCnpjPipe) {
    }

    ngOnChanges(changes): void {
        if (!changes.ngModel.firstChange && (changes.ngModel.currentValue === null || changes.ngModel.currentValue === undefined)) {
            this.elementRef.nativeElement.value = '';
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
            this.elementRef.nativeElement.value = this.cnpjPipe.transform(this.ngModel);
        }
        this.input = false;
    }

    renderViaInput(rawValue: any): void {
        if (rawValue) {
            this.control.markAsDirty();
        }
        this.ngModel = this.format(rawValue);
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.cnpjPipe.transform(this.elementRef.nativeElement.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    format(value) {
        value = value.toString().replace(/[^0-9]+/g, '');
        return value.substring(0, 14);
    }

    validate(control: FormControl): { [key: string]: any } {

        this.control = control;

        if (control.value && this.format(control.value).length < 14) {
            return {parse: true};
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
        const afterSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
        const rawValue: string = this.elementRef.nativeElement.value;
        this.input = true;
        this.renderViaInput(rawValue);
        UiElement.caretPosition.set(this.elementRef.nativeElement, this.beforeSelIndex, afterSelIndex, this.symbolsPositions);
    }

}
