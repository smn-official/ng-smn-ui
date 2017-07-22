import {
    AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input,
    Output
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
    selector: '[uiMaskInteger][ngModel]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiMaskIntegerDirective),
        multi: true
    }]
})
export class UiMaskIntegerDirective implements ControlValueAccessor, AfterViewInit {
    loaded: boolean;
    input: boolean;
    onChange: Function;
    onTouched: Function;
    control: FormControl;
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.loaded = true;
        });
    }

    writeValue(rawValue: any): void {
        if (!this.input) {
            this.elementRef.nativeElement.value = this.ngModel || '';
        }
        this.input = false;
    }

    renderViaInput(rawValue: any): void {
        console.log(rawValue);
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
        const newValue = value.toString().replace(/[^0-9]+/g, '');
        return newValue || undefined;
    }

    @HostListener('input', ['$event']) onInput($event): void {
        const rawValue = this.elementRef.nativeElement.value;
        this.input = true;
        this.renderViaInput(rawValue);
    }

}
