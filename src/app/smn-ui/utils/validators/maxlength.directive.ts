import { Directive, Input, forwardRef} from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS  } from '@angular/forms';

@Directive({
    selector: '[uiMaxlength][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => UiMaxlengthDirective), multi: true }
    ]
})
export class UiMaxlengthDirective implements Validator {
    @Input('uiMaxlength') maxLength: any;

    constructor() {}

    validate(control: AbstractControl): { [key: string]: any } {

        const value = control.value ? control.value.toString() : control.value;

        if (value && value.length > this.maxLength) {
            return {
                uiMaxlength: true
            };
        }

        return null;
    }

}
