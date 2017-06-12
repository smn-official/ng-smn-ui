import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {UiInputContainerComponent} from './input/input-container.component';
import {UiInputDirective} from './input/input.directive';
import {UiToolbarComponent} from './toolbar/toolbar.component';
import {UiOptionComponent} from './option/option.component';

import {UiMaxlengthDirective} from './format/validators/maxlength.directive';

const lib: any[] = [
    UiInputContainerComponent,
    UiInputDirective,
    UiToolbarComponent,
    UiMaxlengthDirective,
    UiOptionComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [...lib],
    exports: [...lib]
})
export class SMNUIModule {
}
