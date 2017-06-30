import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import './button/button.service';
import {UiAddCalendarDirective} from './calendar/add-calendar.directive';
import {UiCalendarComponent} from './calendar/calendar.component';
import {UiCalendarContentComponent} from './calendar/calendar-content.component';
import {UiCapitalizePipe} from './utils/pipes/capitalize.pipe';
import {UiColor} from './providers/color.provider';
import {UiCookie} from './providers/cookie.provider';
import {UiDataTableOrderByDirective} from './data-table/order-by.directive';
import {UiDatePickerCallerDirective} from './date-picker/date-picker-caller.directive';
import {UiDatePickerDirective} from './date-picker/date-picker.directive';
import {UiDatetimeService} from './calendar/datetime.service';
import {UiDialogComponent} from './dialog/dialog.component';
import {UiDialogTriggerDirective} from './dialog/dialog-trigger.directive';
import {UiElement} from './providers/element.provider';
import {UiInputContainerComponent} from './input/input-container.component';
import {UiInputDirective} from './input/input.directive';
import {UiMainMenuComponent} from './main-menu/main-menu.component';
import {UiMaxlengthDirective} from './format/validators/maxlength.directive';
import {UiMenuComponent} from './menu/menu.component';
import {UiMenuItemComponent} from './main-menu/menu-item/menu-item.component';
import {UiMenuListComponent} from './main-menu/menu-list/menu-list.component';
import {UiMenuTriggerDirective} from './menu/menu-trigger.directive';
import {UiNavDrawerComponent} from './nav-drawer/nav-drawer.component';
import {UiOptionComponent} from './selection-control/option/option.component';
import {UiPhonePipe} from './utils/pipes/phone.pipe';
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
import {UiWindowRef} from './providers/window.provider';
import { MaskDateDirective } from './utils/masks/mask-date.directive';
import { UiDatePipe } from './utils/pipes/date.pipe';

export {
    UiColor,
    UiCookie,
    UiElement,
    UiPhonePipe,
    UiSnackbar,
    UiToolbarService,
    UiWindowRef,
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
    UiMainMenuComponent,
    UiMaxlengthDirective,
    UiMenuComponent,
    UiMenuItemComponent,
    UiMenuListComponent,
    UiMenuTriggerDirective,
    UiNavDrawerComponent,
    UiOptionComponent,
    UiPhonePipe,
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
    MaskDateDirective,
    UiDatePipe
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
