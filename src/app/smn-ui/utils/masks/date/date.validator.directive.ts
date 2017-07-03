import {Directive, ElementRef, forwardRef, Input, OnChanges} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {checkDate} from './check-date';

@Directive({
    selector: '[uiMaskDate][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => UiDateValidatorDirective), multi: true }
    ]
})
export class UiDateValidatorDirective implements Validator, OnChanges {

    @Input() minDate: Date;
    @Input() maxDate: Date;
    public control: AbstractControl;

    constructor(public elementRef: ElementRef) {
    }

    ngOnChanges(changes) {
        if ((changes.minDate && !changes.minDate.firstChange) || (changes.maxDate && !changes.maxDate.firstChange)) {
            this.control.updateValueAndValidity(this.control);
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {

        this.control = control;
        const value = this.elementRef.nativeElement.value;
        const dateControl = control.value;

        if (value && !checkDate(value)) {
            return { parse: true };
        } else if (checkDate(value)) {
            dateControl.setHours(0, 0, 0, 0);

            if (this.minDate) {
                this.minDate.setHours(0, 0, 0, 0);

                if (dateControl.getTime() < this.minDate.getTime()) {
                    return { minDate: true };
                }
            }
            if (this.maxDate) {
                this.maxDate.setHours(0, 0, 0, 0);

                if (dateControl.getTime() > this.maxDate.getTime()) {
                    return { maxDate: true };
                }
            }
        }

        return null;
    }


}
