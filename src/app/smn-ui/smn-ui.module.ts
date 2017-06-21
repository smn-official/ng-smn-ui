import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {UiInputContainerComponent} from './input/input-container.component';
import {UiInputDirective} from './input/input.directive';
import {UiToolbarComponent} from './toolbar/toolbar.component';
import {UiOptionComponent} from './selection-control/option/option.component';
import {UiSwitchComponent} from './selection-control/switch/switch.component';
import {UiMaxlengthDirective} from './format/validators/maxlength.directive';
import {UiDatepickerComponent} from './datepicker/datepicker.component';
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
import './button/button.component';

import {UiCookie} from './providers/cookie.provider';
import {UiToolbarService} from './toolbar/toolbar.service';
import {UiElement} from './providers/element.provider';
import {UiWindowRef} from './providers/window.provider';

export {UiCookie, UiToolbarService, UiElement, UiWindowRef}

const lib: any[] = [
    UiInputContainerComponent,
    UiInputDirective,
    UiToolbarComponent,
    UiMaxlengthDirective,
    UiCalendarComponent,
    UiDatepickerComponent,
    UiOptionComponent,
    UiSwitchComponent,
    UiCalendarContentComponent,
    UiAddCalendarDirective,
    UiMainMenuComponent,
    UiMenuListComponent,
    UiMenuItemComponent,
    UiCapitalizePipe,
    UiNavDrawerComponent,
    UiRippleDirective
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
        UiWindowRef,
        UiDatetimeService,
        UiElement
    ],
    entryComponents: [UiCalendarContentComponent]
})
export class SMNUIModule {
}
