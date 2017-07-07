import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import './button/button.service';
import {UiAddCalendarDirective} from './calendar/add-calendar.directive';
import {UiCalendarComponent} from './calendar/calendar.component';
import {UiCalendarContentComponent} from './calendar/calendar-content.component';
import {UiCapitalizePipe} from './utils/pipes/capitalize.pipe';
import {UiColor} from './utils/providers/color.provider';
import {UiCookie} from './utils/providers/cookie.provider';
import {UiDataTableOrderByDirective} from './data-table/order-by.directive';
import {UiDatePickerCallerDirective} from './date-picker/date-picker-caller.directive';
import {UiDatePickerDirective} from './date-picker/date-picker.directive';
import {UiDatetimeService} from './calendar/datetime.service';
import {UiDialogComponent} from './dialog/dialog.component';
import {UiDialogTriggerDirective} from './dialog/dialog-trigger.directive';
import {UiElement} from './utils/providers/element.provider';
import {UiInputContainerComponent} from './input/input-container.component';
import {UiInputDirective} from './input/input.directive';
import {UiMaxlengthDirective} from './utils/validators/maxlength.directive';
import {UiMenuComponent} from './menu/menu.component';
import {UiMenuTriggerDirective} from './menu/menu-trigger.directive';
import {UiNavDrawerComponent} from './nav-drawer/nav-drawer.component';
import {UiOptionComponent} from './selection-control/option/option.component';
import {UiProgressRadialComponent} from './progress/radial/progress-radial.component';
import {UiReferencesService} from './date-picker/references.service';
import {UiRippleDirective} from './ripple/ripple.directive';
import {UiSmartListComponent} from './smart-list/smart-list.component';
import {UiSnackbarComponent} from './snackbar/snackbar.component';
import {UiSnackbarContainerComponent} from './snackbar/snackbar-container.component';
import {UiSnackbar} from './snackbar/snackbar.provider';
import {UiSwitchComponent} from './selection-control/switch/switch.component';
import {UiToolbarComponent} from './toolbar/toolbar.component';
import {UiToolbarService} from './toolbar/toolbar.service';
import {UiWindowRef} from './utils/providers/window.provider';
import {UiMaskDateDirective} from './utils/masks/date/mask-date.directive';
import {UiTimeAgoPipe} from './utils/pipes/time-ago.pipe';
import {UiListItemDirective} from './list/list-item.directive';
import {UiMaskCpfDirective} from './utils/masks/cpf/mask-cpf.directive';
import {UiCpfPipe} from './utils/masks/cpf/cpf.pipe';
import {UiMaskCnpjDirective} from './utils/masks/cnpj/mask-cnpj.directive';
import {UiCnpjPipe} from './utils/masks/cnpj/cnpj.pipe';
import {UiMaskCepDirective} from './utils/masks/cep/mask-cep.directive';
import {UiCepPipe} from './utils/masks/cep/cep.pipe';
import {UiPhonePipe} from './utils/masks/phone/phone.pipe';
import {UiMaskPhoneDirective} from './utils/masks/phone/mask-phone.directive';
// import {UiListComponent} from './list/list.component';

export {
    UiColor,
    UiCookie,
    UiElement,
    UiSnackbar,
    UiToolbarService,
    UiWindowRef,
    UiCpfPipe,
    UiCnpjPipe,
    UiCepPipe,
    UiPhonePipe
}

const lib: any[] = [
    UiAddCalendarDirective,
    UiCalendarComponent,
    UiCalendarContentComponent,
    UiCapitalizePipe,
    UiDataTableOrderByDirective,
    UiDatePickerCallerDirective,
    UiDatePickerDirective,
    UiDialogComponent,
    UiDialogTriggerDirective,
    UiInputContainerComponent,
    UiInputDirective,
    UiMaxlengthDirective,
    UiMenuComponent,
    UiMenuTriggerDirective,
    UiNavDrawerComponent,
    UiOptionComponent,
    UiProgressRadialComponent,
    UiRippleDirective,
    UiSmartListComponent,
    UiSnackbarComponent,
    UiSnackbarComponent,
    UiSnackbarContainerComponent,
    UiSwitchComponent,
    UiToolbarComponent,
    UiMenuComponent,
    UiMenuTriggerDirective,
    UiProgressRadialComponent,
    UiMaskDateDirective,
    UiTimeAgoPipe,
    UiListItemDirective,
    UiMaskCpfDirective,
    UiCpfPipe,
    UiMaskCnpjDirective,
    UiCnpjPipe,
    UiMaskCepDirective,
    UiCepPipe,
    UiMaskPhoneDirective,
    UiPhonePipe,
    // UiListComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [...lib],
    exports: [...lib],
    providers: [
        UiColor,
        UiDatetimeService,
        UiElement,
        UiReferencesService,
        UiSnackbar,
        UiWindowRef,
    ],
    entryComponents: [UiCalendarComponent, UiCalendarContentComponent]
})
export class SMNUIModule {
}
