import { Directive, forwardRef, OnChanges, AfterViewInit, Input, EventEmitter, Output, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, FormControl } from '@angular/forms';
import { UiCreditCardPipe, UiElement } from '../../../smn-ui.module';

@Directive({
    selector: '[uiMaskCreditCard][ngModel]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiMaskCreditCard),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UiMaskCreditCard),
        multi: true
    }, UiCreditCardPipe]
})
export class UiMaskCreditCard implements ControlValueAccessor, Validator, AfterViewInit, OnChanges {
    loaded: boolean;
    beforeSelIndex;
    onChange: Function;
    onTouched: Function;
    control: FormControl;
    symbolsPositions: number[] = [4, 9, 14];
    @Input() ngModel: any;
    @Input() UiMaskCreditCard;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public creditCardPipe: UiCreditCardPipe, private changeDetector: ChangeDetectorRef) { }

    ngOnChanges(changes): void {
        if (!changes.ngModel.firstChange && (changes.ngModel.currentValue === null || changes.ngModel.currentValue === undefined)) {
            this.elementRef.nativeElement.value = '';
        }
    }

    ngAfterViewInit() {
        this.loaded = true;
        this.changeDetector.detectChanges();
    }

    writeValue(rawValue: any): void {
        if (this.control && this.loaded && rawValue) {
            this.control.markAsDirty();
        }

        this.elementRef.nativeElement.value = this.creditCardPipe.transform(this.ngModel);
    }

    renderViaInput(rawValue: any): void {
        if (rawValue) {
            this.control.markAsDirty();
        }
        this.ngModel = this.format(rawValue);
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.creditCardPipe.transform(this.elementRef.nativeElement.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    format(value) {
        value = value.toString().replace(/[^0-9]+/g, '');
        return value.substring(0, 16);
    }

    validate(control: FormControl): { [key: string]: any } {
        this.control = control;

        if (control.value && this.format(control.value).length < 16) {
            return { parse: true };
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
        this.renderViaInput(rawValue);
        UiElement.caretPosition.set(this.elementRef.nativeElement, this.beforeSelIndex, afterSelIndex, this.symbolsPositions);
    }
}
