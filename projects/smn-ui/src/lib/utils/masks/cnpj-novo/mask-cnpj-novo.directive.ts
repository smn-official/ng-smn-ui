import {
    AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges,
    Output
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { UiCnpjNovoPipe } from './cnpj-novo.pipe';
import { UiElement } from '../../providers/element.provider';

@Directive({
    selector: '[uiMaskCnpjNovo][ngModel]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiMaskCnpjNovoDirective),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UiMaskCnpjNovoDirective),
        multi: true
    }, UiCnpjNovoPipe]
})
export class UiMaskCnpjNovoDirective implements ControlValueAccessor, Validator, AfterViewInit, OnChanges {

    loaded: boolean;
    input: boolean;
    beforeSelIndex;
    onChange: Function;
    onTouched: Function;
    control: FormControl;
    symbolsPositions: number[] = [2, 6, 10, 15, 18];
    @Input() ngModel: any;
    @Input() padOnPaste: boolean = true;
    @Input('uiMaskCnpjNovo') uiMaskCnpjNovo;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef, public cnpjPipe: UiCnpjNovoPipe) {
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
            if (this.ngModel) {
                const value = this.ngModel.toString().toUpperCase();
                const cleanValue = value.replace(/[^0-9A-Z]+/g, '');
                const isNumericOnly = /^[0-9]*$/.test(cleanValue);
                const paddedValue = isNumericOnly ? cleanValue.padStart(14, '0') : cleanValue;
                if (paddedValue !== cleanValue) {
                    this.ngModel = paddedValue;
                    setTimeout(() => this.ngModelChange.emit(this.ngModel));
                } else {
                    this.ngModel = paddedValue;
                }
            } else {
                this.ngModel = '';
            }
            this.elementRef.nativeElement.value = this.cnpjPipe.transform(this.ngModel, true);
        }
        this.input = false;
    }

    renderViaInput(rawValue: any): void {
        if (rawValue) {
            this.control.markAsDirty();
        }

        this.ngModel = this.format(rawValue);
        this.ngModelChange.emit(this.ngModel);
        this.elementRef.nativeElement.value = this.cnpjPipe.transform(this.elementRef.nativeElement.value, true);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    format(value) {
        // Aceita números e letras (A-Z), normaliza para maiúsculas
        value = value.toString().toUpperCase().replace(/[^0-9A-Z]+/g, '');
        return value.substring(0, 14);
    }

    validate(control: FormControl): { [key: string]: any } {

        this.control = control;

        if (this.input) {
            if (control.value && this.format(control.value).length < 14) {
                return { parse: true };
            }
        }

        if (this.uiMaskCnpjNovo === true && control.value) {
            let value = control.value.toString().toUpperCase().replace(/[^0-9A-Z]+/g, '');
            const isNumericOnly = /^[0-9]*$/.test(value);
            if (isNumericOnly) {
                value = value.padStart(14, '0');
            }
            if (!this.cnpjIsValid(value)) {
                return { parse: true };
            }
        }

        this.input = false;
        return null;
    }

    setDisabledState(isDisabled: boolean) {
        const method = isDisabled ? 'setAttribute' : 'removeAttribute';
        this.elementRef.nativeElement[method]('disabled', 'disabled');
    }

    /**
     * Converte um caractere para seu valor numérico.
     * Usa código ASCII - 48 para todos os caracteres:
     * - Dígitos 0-9 retornam 0-9
     * - Letras A-Z retornam 17-42 (A=17, B=18, ..., Z=42)
     * Referência: https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/perguntas-e-respostas/cnpj/cnpj-alfanumerico.pdf
     */
    charToValue(char: string): number {
        return char.toUpperCase().charCodeAt(0) - 48;
    }

    /**
     * Valida CNPJ alfanumérico conforme especificação.
     * Suporta tanto CNPJs numéricos tradicionais quanto os novos alfanuméricos.
     * A conversão usa ASCII - 48 para todos os caracteres (A=17, B=18, ..., Z=42).
     */
    cnpjIsValid(cnpj: string): boolean {
        if (!cnpj || cnpj.length !== 14) {
            return false;
        }

        // Normaliza para maiúsculas
        cnpj = cnpj.toUpperCase();

        // Verifica se contém apenas caracteres válidos (0-9 e A-Z)
        if (!/^[0-9A-Z]{14}$/.test(cnpj)) {
            return false;
        }

        // Verifica CNPJs com todos os caracteres iguais
        if (/^(.)\1{13}$/.test(cnpj)) {
            return false;
        }

        const base = cnpj.substring(0, 12);
        const digits = cnpj.substring(12);

        // Calcula o primeiro dígito verificador
        let sum = 0;
        let pos = 5;
        for (let i = 0; i < 12; i++) {
            sum += this.charToValue(base.charAt(i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== this.charToValue(digits.charAt(0))) {
            return false;
        }

        // Calcula o segundo dígito verificador
        const baseWithFirstDigit = base + digits.charAt(0);
        sum = 0;
        pos = 6;
        for (let i = 0; i < 13; i++) {
            sum += this.charToValue(baseWithFirstDigit.charAt(i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        return result === this.charToValue(digits.charAt(1));
    }

    @HostListener('keydown')
    onKeydown() {
        this.beforeSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
    }

    @HostListener('input', ['$event'])
    onInput($event): void {
        const afterSelIndex = UiElement.caretPosition.get(this.elementRef.nativeElement);
        const rawValue: string = this.elementRef.nativeElement.value;
        this.input = this.format(rawValue) !== this.ngModel;
        this.renderViaInput(rawValue);
        UiElement.caretPosition.set(this.elementRef.nativeElement, this.beforeSelIndex, afterSelIndex, this.symbolsPositions);
    }

    @HostListener('paste', ['$event'])
    padLeft(event: any): void {
        if (this.padOnPaste) {
            event.preventDefault();

            let data: any;

            if (window['clipboardData']) {
                data = window['clipboardData'];
            } else if (event.clipboardData && event.clipboardData.getData) {
                data = event.clipboardData;
            }

            // Aceita números e letras, normaliza para maiúsculas
            const text = data.getData('text').toString().toUpperCase().replace(/[^0-9A-Z]+/g, '');
            // Só faz padStart se for CNPJ numérico puro (retrocompatibilidade)
            const isNumericOnly = /^[0-9]*$/.test(text);
            this.renderViaInput(isNumericOnly ? text.padStart(14, '0') : text);
        }
    }
}
