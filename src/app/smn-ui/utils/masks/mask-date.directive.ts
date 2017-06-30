import {
    AfterViewChecked,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {UiDatePipe} from '../pipes/date.pipe';
import {DatePipe} from '@angular/common';

@Directive({
    selector: '[uiMaskDate]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MaskDateDirective),
        multi: true
    }, UiDatePipe, DatePipe]
})
export class MaskDateDirective implements AfterViewChecked, ControlValueAccessor, OnInit {

    onTouched: any;
    onChange: any;
    input;
    @Input() ngModel;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public uiDatePipe: UiDatePipe, public datePipe: DatePipe, private cdRef: ChangeDetectorRef) {
    }

    ngAfterViewChecked() {
    }

    ngOnInit() {

    }

    writeValue(rawValue: any): void {
        if (!this.input) {
            this.elementRef.nativeElement.value = this.formatDate(this.datePipe.transform(this.ngModel, 'dd/MM/yyyy'));
        }
        this.input = false;
    }

    render(rawValue) {
        this.ngModel = this.uiDatePipe.transform(this.formatDate(rawValue));
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.formatDate(this.elementRef.nativeElement.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    formatDate(date) {
        if (!date) return '';
        date = date.toString().replace(/[^0-9]+/g, '');
        if (date.length > 2)
            date = date.substring(0, 2) + '/' + date.substring(2);
        if (date.length > 5)
            date = date.substring(0, 5) + '/' + date.substring(5, 9);
        return date;
    }

    @HostListener('input', ['$event']) onControlInput($event: KeyboardEvent) {
        const rawValue: any = this.elementRef.nativeElement.value;
        this.input = true;
        this.render(rawValue);
    }
}
