import {
    AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input,
    Output, OnChanges, OnInit
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

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
    }]
})
export class UiMaskFloatDirective implements ControlValueAccessor, AfterViewInit, OnChanges {
    loaded: boolean;
    input: boolean;
    onChange: Function;
    onTouched: Function;
    control: FormControl;
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    @Input() uiMaskFloat: any;
    @Input() min: number;
    @Input() max: number;

    constructor(public elementRef: ElementRef) {
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
            this.elementRef.nativeElement.value = this.ngModel || '';
        }
        this.input = false;
    }

    renderViaInput(rawValue: any): void {
        if (rawValue) {
            this.control.markAsDirty();
        }
        this.ngModel = this.format(rawValue);
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.ngModel || '';
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    format(value) {
        const newValue = value.toString().replace(/[^0-9.]+/g, '');
        return newValue || undefined;
    }

    validate(control: FormControl): { [key: string]: any } {
        this.control = control;

        if (typeof this.min !== 'undefined' && control.value && this.format(control.value) < this.min) {
            return {min: true};
        }

        if (typeof this.max !== 'undefined' && control.value && this.format(control.value) > this.max) {
            return {max: true};
        }

        return null;
    }

    isNumber(value) {
        return !(!value && value != 0);
    }

    setDisabledState(isDisabled: boolean) {
        const method = isDisabled ? 'setAttribute' : 'removeAttribute';
        this.elementRef.nativeElement[method]('disabled', 'disabled');
    }

    @HostListener('input', ['$event'])
    onInput($event): void {
        const rawValue = this.elementRef.nativeElement.value;
        this.input = true;
        this.renderViaInput(rawValue);
    }

}
