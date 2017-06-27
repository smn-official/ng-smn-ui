import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import './button/button.service';
import {UiInputContainerComponent} from './input/input-container.component';
import {UiInputDirective} from './input/input.directive';
import {UiToolbarComponent} from './toolbar/toolbar.component';
import {UiOptionComponent} from './selection-control/option/option.component';
import {UiSwitchComponent} from './selection-control/switch/switch.component';
import {UiMaxlengthDirective} from './format/validators/maxlength.directive';
import {UiCalendarComponent} from './calendar/calendar.component';
import {UiCalendarContentComponent} from './calendar/calendar-content.component';
import {UiAddCalendarDirective} from './calendar/add-calendar.directive';
import {UiMainMenuComponent} from './main-menu/main-menu.component';
import {UiMenuListComponent} from './main-menu/menu-list/menu-list.component';
import {UiMenuItemComponent} from './main-menu/menu-item/menu-item.component';
import {UiNavDrawerComponent} from './nav-drawer/nav-drawer.component';
import {UiDatetimeService} from './calendar/datetime.service';
import {UiCapitalizePipe} from './utils/pipes/capitalize.pipe';
import {UiRippleDirective} from './ripple/ripple.directive';
import {UiDatePickerDirective} from './date-picker/date-picker.directive';
import {UiDatePickerCallerDirective} from './date-picker/date-picker-caller.directive';
import {UiSnackbarContainerComponent} from './snackbar/snackbar-container.component';
import {UiReferencesService} from './date-picker/references.service';
import {UiSnackbarComponent} from './snackbar/snackbar.component';
import {UiPhonePipe} from './utils/pipes/phone.pipe';
import {UiDataTableOrderByDirective} from './data-table/order-by.directive';
import {UiSmartListComponent} from './smart-list/smart-list.component';
import {UiCookie} from './providers/cookie.provider';
import {UiToolbarService} from './toolbar/toolbar.service';
import {UiElement} from './providers/element.provider';
import {UiWindowRef} from './providers/window.provider';
import {UiColor} from './providers/color.provider';
import {UiSnackbar} from './snackbar/snackbar.provider';
import {UiMenuComponent} from './menu/menu.component';
import {UiMenuTriggerDirective} from './menu/menu-trigger.directive';
export {UiPhonePipe};

export {UiCookie, UiToolbarService, UiElement, UiWindowRef, UiColor, UiSnackbar}

const lib: any[] = [
    UiInputContainerComponent,
    UiInputDirective,
    UiToolbarComponent,
    UiMaxlengthDirective,
    UiCalendarComponent,
    UiOptionComponent,
    UiSwitchComponent,
    UiCalendarContentComponent,
    UiAddCalendarDirective,
    UiMainMenuComponent,
    UiMenuListComponent,
    UiMenuItemComponent,
    UiCapitalizePipe,
    UiNavDrawerComponent,
    UiRippleDirective,
    UiDatePickerDirective,
    UiDatePickerCallerDirective,
    UiPhonePipe,
    UiDataTableOrderByDirective,
    UiSnackbarContainerComponent,
    UiSnackbarComponent,
    UiSmartListComponent,
    UiSnackbarComponent,
    UiMenuComponent,
    UiMenuTriggerDirective
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
        UiReferencesService,
        UiWindowRef,
        UiDatetimeService,
        UiElement,
        UiSnackbar,
        UiColor
    ],
    entryComponents: [UiCalendarComponent, UiCalendarContentComponent]
})
export class SMNUIModule {
}
