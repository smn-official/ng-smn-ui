import { Directive, Input, forwardRef} from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS  } from '@angular/forms';

@Directive({
    selector: '[required][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => UiRequiredDirective), multi: true }
    ]
})
export class UiRequiredDirective implements Validator {
    @Input('required') maxLength: any;

    constructor() {}

    validate(control: AbstractControl): { [key: string]: any } {

        const value = control.value;

        if (value && value.trim && !value.trim()) {
            return {
                required: true,
                uiMaxlength: false
            };
        }

        return null;
    }

}
