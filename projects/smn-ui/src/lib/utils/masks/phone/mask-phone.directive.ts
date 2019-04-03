import {
    AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input,
    Output, OnChanges, OnInit
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { UiPhonePipe } from './phone.pipe';
import { UiElement } from '../../providers/element.provider';

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
export class UiMaskPhoneDirective implements ControlValueAccessor, Validator, AfterViewInit, OnChanges, OnInit {

    loaded: boolean;
    input: boolean;
    beforeSelIndex;
    onChange: Function;
    onTouched: Function;
    control: FormControl;
    symbolsPositions: number[];
    maxLength: number;
    @Input() ngModel: any;
    @Input() uiMaskPhone: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public phonePipe: UiPhonePipe) {
    }

    ngOnInit() {
        switch (this.uiMaskPhone) {
            case 'ddi':
                this.maxLength = 13;
                this.symbolsPositions = [0, 12, 14, 17];
                break;
            default:
                this.maxLength = 11;
                this.symbolsPositions = [0, 9, 11, 14];
        }
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
            this.elementRef.nativeElement.value = this.phonePipe.transform(this.ngModel, { type: this.uiMaskPhone || '' });
        }
        this.input = false;
    }

    renderViaInput(rawValue: any): void {
        if (rawValue) {
            this.control.markAsDirty();
        }
        this.ngModel = this.format(rawValue);
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.phonePipe.transform(this.elementRef.nativeElement.value, { type: this.uiMaskPhone || '' });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    format(value) {
        value = value.toString().replace(/[^0-9]+/g, '');
        return value.substring(0, this.maxLength);
    }

    validate(control: FormControl): { [key: string]: any } {

        this.control = control;

        if (control.value && this.format(control.value).length < this.maxLength - 1) {
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

        if (this.uiMaskPhone === 'ddi') {
            if (afterSelIndex === 4) {
                this.beforeSelIndex = 5;
                afterSelIndex = 6;
            }

            if (afterSelIndex === 8) {
                this.beforeSelIndex = 9;
                afterSelIndex = 10;
            }
        } else {
            if (afterSelIndex === 4) {
                this.beforeSelIndex = 5;
                afterSelIndex = 6;
            }
        }

        UiElement.caretPosition.set(this.elementRef.nativeElement, this.beforeSelIndex, afterSelIndex, this.symbolsPositions);
    }

}
