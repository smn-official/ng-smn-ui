import { DatePipe } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

import { isDate } from 'rxjs/internal/util/isDate';

import { UiElement } from '../../providers/element.provider';
import { checkDate } from './check-date';

@Directive({
    selector: '[uiMaskDate][ngModel]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiMaskDateDirective),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UiMaskDateDirective),
        multi: true
    }, DatePipe]
})
export class UiMaskDateDirective implements ControlValueAccessor, Validator, OnChanges, AfterViewInit, OnInit {

    loaded: boolean;
    input: boolean;
    beforeSelIndex;
    onChange: Function;
    onTouched: Function;
    control: any;
    maxlength = 10;
    regex = /^\d\d\/\d\d\/\d\d\d\d$/g;
    regexiso = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z|(((\+|\-)[0-1][0-9]):([0-5][0-9])))?$/g;
    symbolsPositions: number[] = [2, 5];
    dateFormatsList = [
        {
            format: 'dd/MM/yyyy',
            maxlength: 10,
            regex: /^(\d{2}\/){2}\d{4}$/g,
            symbolsPositions: [2, 5]
        },
        {
            format: 'dd/MM',
            maxlength: 5,
            regex: /^(\d{2})\/(\d{2})$/g,
            symbolsPositions: [2]
        },
        {
            format: 'MM/yyyy',
            maxlength: 7,
            regex: /^(\d{2})\/(\d{4})$/g,
            symbolsPositions: [2]
        },
        {
            format: 'dd/MM/yy',
            maxlength: 8,
            regex: /^(\d{2}\/){2}\d{2}$/g,
            symbolsPositions: [2, 5]
        },
        {
            format: 'MM/yy',
            maxlength: 5,
            regex: /^(\d{2})\/(\d{2})$/g,
            symbolsPositions: [2]
        }
    ];

    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() ngModel: any;
    @Input() dateFormat: string;
    @Input() day = '01'; // Dia padrão
    @Input() year: string = (new Date().getFullYear()).toString(); // Ano Padrão
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public datePipe: DatePipe) {
    }

    ngOnInit() {
        this.validaDateFormat();
    }

    ngAfterViewInit() {
        this.minDate = this.minDate && isDate(new Date(this.minDate)) ? new Date(this.minDate) : this.minDate;
        this.maxDate = this.maxDate && isDate(new Date(this.maxDate)) ? new Date(this.maxDate) : this.maxDate;

        this.ngModel = this.ngModel && isDate(new Date(this.ngModel)) ? new Date(this.ngModel) : this.ngModel;

        setTimeout(() => {
            this.loaded = true;
        });
    }

    writeValue(rawValue: any): void {
        if (this.control && this.loaded && rawValue) {
            this.control.markAsDirty();
        }
        if (!this.input) {
            this.elementRef.nativeElement.value = this.format(this.datePipe.transform(this.ngModel, this.dateFormat));
        }
        this.input = false;
    }

    renderViaInput(rawValue: any): void {
        if (rawValue) {
            this.control.markAsDirty();
        }
        this.ngModel = checkDate(this.getCorrectValue(this.format(rawValue))) || this.format(rawValue);
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.format(this.elementRef.nativeElement.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    format(date: string): string {
        if (!date) {
            return '';
        }

        date = date.toString().replace(/[^0-9]+/g, '');
        if (date.length > this.symbolsPositions[0]) {
            date = date.substring(0, this.symbolsPositions[0]) + '/' + date.substring(this.symbolsPositions[0]);
        }
        if (date.length > this.symbolsPositions[1]) {
            date = date.substring(0, this.symbolsPositions[1]) + '/' + date.substring(this.symbolsPositions[1], this.maxlength - 1);
        }
        return date.substring(0, this.maxlength);
    }

    /**
     * Verifica se o formato da data é válido
     */
    validaDateFormat() {
        if (!this.dateFormat) { // Caso não seja passado nenhum parametro, coloca o default
            this.dateFormat = 'dd/MM/yyyy';
            return;
        }

        let valid = false;

        this.dateFormatsList.forEach(item => {
            if (item.format === this.dateFormat) {
                this.maxlength = item.maxlength;
                this.regex = item.regex;
                this.symbolsPositions = item.symbolsPositions;
                valid = true;
            }
        });

        if (!valid) {
            console.error('Formato de data não suportado, tente algum destes: ["dd/MM/yyyy", "dd/MM", "MM/yyyy", "dd/MM/yy", "MM/yy"]');
        }
    }

    ngOnChanges(changes): void {
        if (changes.ngModel && !changes.ngModel.firstChange && (changes.ngModel.currentValue === null || changes.ngModel.currentValue === undefined)) {
            this.elementRef.nativeElement.value = '';
        }
        if (changes.minDate && !changes.minDate.firstChange) {
            this.minDate = changes.minDate.currentValue && isDate(new Date(this.minDate)) ? new Date(this.minDate) : this.minDate;
            this.control.updateValueAndValidity(this.control);
        }
        if (changes.maxDate && !changes.maxDate.firstChange) {
            this.maxDate = changes.maxDate.currentValue && isDate(new Date(this.maxDate)) ? new Date(this.maxDate) : this.maxDate;
            this.control.updateValueAndValidity(this.control);
        }
        if ((changes.minDate && !changes.minDate.firstChange) || (changes.maxDate && !changes.maxDate.firstChange)) {
            this.control.updateValueAndValidity(this.control);
        }
    }

    /**
     * Retorna o valor formatado corretamente p/ uma data válida
     * @param value { string } valor da view
     */
    getCorrectValue(value: string) {
        const test = this.regex.test(value);

        if (this.dateFormat === 'MM/yyyy' && test) {
            return `${this.day}/${value}`;
        }

        if (this.dateFormat === 'dd/MM' && test) {
            return `${value}/${this.year}`;
        }

        if (this.dateFormat === 'dd/MM/yy' && test) {
            const valueSplitted = value.split('/');
            return `${valueSplitted[0]}/${valueSplitted[1]}/20${valueSplitted[2]}`;
        }

        if (this.dateFormat === 'MM/yy' && test) {
            const valueSplitted = value.split('/');
            return `${this.day}/${valueSplitted[0]}/20${valueSplitted[1]}`;
        }

        return value;
    }

    validate(control: FormControl): { [key: string]: any } {
        this.control = control;
        const value = this.ngModel && this.regexiso.test(this.ngModel) ? new Date(this.ngModel) : this.ngModel;
        const dateControl = isDate(control.value) ? control.value : new Date(control.value);

        if (value && (!isDate(value) || !checkDate(value.toLocaleDateString()))) {
            return { parse: true };
        }

        if (value && (isDate(value) || checkDate(value.toLocaleDateString()))) {
            dateControl.setHours(0, 0, 0, 0);

            if (this.minDate && isDate(this.minDate)) {
                this.minDate.setHours(0, 0, 0, 0);

                if (dateControl.getTime() < this.minDate.getTime()) {
                    return { minDate: true };
                }
            }
            if (this.maxDate && isDate(this.maxDate)) {
                this.maxDate.setHours(0, 0, 0, 0);

                if (dateControl.getTime() > this.maxDate.getTime()) {
                    return { maxDate: true };
                }
            }
        }

        return null;
    }

    setDisabledState(isDisabled: boolean) {
        const method = isDisabled ? 'setAttribute' : 'removeAttribute';
        this.elementRef.nativeElement[method]('disabled', 'disabled');
    }

    @HostListener('keydown')
    onKeydown() {
        this.beforeSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
    }

    @HostListener('input', ['$event'])
    onInput($event): void {
        const afterSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
        const rawValue: string = this.elementRef.nativeElement.value;
        this.input = true;
        this.renderViaInput(rawValue);
        UiElement.caretPosition.set(this.elementRef.nativeElement, this.beforeSelIndex, afterSelIndex, this.symbolsPositions);
    }
}
