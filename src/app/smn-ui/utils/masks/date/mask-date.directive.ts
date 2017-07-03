import {Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {UiElement} from '../../../providers/element.provider';
import {checkDate} from './check-date';

@Directive({
    selector: '[uiMaskDate]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MaskDateDirective),
        multi: true
    }, DatePipe]
})
export class MaskDateDirective implements ControlValueAccessor {

    input: boolean;
    onChange: Function;
    onTouched: Function;
    beforeSelIndex;
    symbolsPositions: number[] = [2, 5];
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public datePipe: DatePipe) {
    }

    writeValue(rawValue: any): void {
        if (!this.input) {
            this.elementRef.nativeElement.value = this.formatDate(this.datePipe.transform(this.ngModel, 'dd/MM/yyyy'));
        }
        this.input = false;
    }

    render(rawValue: any): void {
        this.ngModel = checkDate(this.formatDate(rawValue));
        this.ngModel = this.ngModel ? this.ngModel.toISOString() : '';
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.formatDate(this.elementRef.nativeElement.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    formatDate(date: string): string {
        if (!date) {
            return '';
        }

        date = date.toString().replace(/[^0-9]+/g, '');
        if (date.length > this.symbolsPositions[0]) {
            date = date.substring(0, 2) + '/' + date.substring(2);
        }
        if (date.length > this.symbolsPositions[1]) {
            date = date.substring(0, 5) + '/' + date.substring(5, 9);
        }
        return date;
    }

    @HostListener('keydown') onKeydown() {
        this.beforeSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
    }

    @HostListener('input', ['$event']) onInput($event): void {
        const afterSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
        const rawValue: string = this.elementRef.nativeElement.value;
        this.input = true;
        this.render(rawValue);
        UiElement.caretPosition.set(this.elementRef.nativeElement, this.beforeSelIndex, afterSelIndex, this.symbolsPositions);
    }
}
