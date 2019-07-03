import {
    AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges,
    Output
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {UiCpfPipe} from './cpf.pipe';
import {UiElement} from '../../providers/element.provider';

@Directive({
    selector: '[uiMaskCpf][ngModel]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiMaskCpfDirective),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UiMaskCpfDirective),
        multi: true
    }, UiCpfPipe]
})
export class UiMaskCpfDirective implements ControlValueAccessor, Validator, AfterViewInit, OnChanges {

    loaded: boolean;
    input: boolean;
    beforeSelIndex;
    onChange: Function;
    onTouched: Function;
    control: FormControl;
    symbolsPositions: number[] = [3, 7, 11, 14];
    @Input() ngModel: any;
    @Input('uiMaskCpf') uiMaskCpf;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public cpfPipe: UiCpfPipe) {
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
            this.ngModel = this.ngModel.toString().padStart(11, '0');
            this.elementRef.nativeElement.value = this.cpfPipe.transform(this.ngModel, true);
        }
        this.input = false;
    }

    renderViaInput(rawValue: any): void {
        if (rawValue) {
            this.control.markAsDirty();
        }
        this.ngModel = this.format(rawValue);
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.cpfPipe.transform(this.elementRef.nativeElement.value, true);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    format(value) {
        value = value.toString().replace(/[^0-9]+/g, '');
        return value.substring(0, 11);
    }

    validate(control: FormControl): { [key: string]: any } {
        this.control = control;

        if (control.value && this.format(control.value).length < 11) {
            return {parse: true};
        }

        if (this.uiMaskCpf === true && control.value && !this.cpfIsValid(control.value)) {
            return {parse: true};
        }

        return null;
    }

    setDisabledState(isDisabled: boolean) {
        const method = isDisabled ? 'setAttribute' : 'removeAttribute';
        this.elementRef.nativeElement[method]('disabled', 'disabled');
    }

    cpfIsValid(cpf) {
        if (cpf && cpf.length === 11) {
            let sum;
            let rest;
            sum = 0;
            if (cpf === '00000000000') {
                return false;
            }
            for (let i = 1; i <= 9; i++) {
                sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
            }
            rest = (sum * 10) % 11;
            if ((rest === 10) || (rest === 11)) {
                rest = 0;
            }
            if (rest !== parseInt(cpf.substring(9, 10), 10)) {
                return false;
            }
            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum = sum + parseInt(cpf.substring(i - 1, i), 20) * (12 - i);
            }
            rest = (sum * 10) % 11;
            if ((rest === 10) || (rest === 11)) {
                rest = 0;
            }
            return rest === parseInt(cpf.substring(10, 11), 10);
        }
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
