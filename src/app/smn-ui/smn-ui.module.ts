import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {UiInputContainerComponent} from './input/input-container.component';
import {UiInputDirective} from './input/input.directive';
import {UiToolbarComponent} from './toolbar/toolbar.component';
import {UiOptionComponent} from './selection-control/option/option.component';
import {UiSwitchComponent} from './selection-control/switch/switch.component';
import {UiMaxlengthDirective} from './format/validators/maxlength.directive';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {CalendarComponent} from './calendar/calendar.component';
import {CalendarContentComponent} from './calendar/calendar-content.component';
import {AddCalendarDirective} from './calendar/add-calendar.directive';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {MenuListComponent} from './main-menu/menu-list/menu-list.component';
import {MenuItemComponent} from './main-menu/menu-item/menu-item.component';

const lib: any[] = [
    UiInputContainerComponent,
    UiInputDirective,
    UiToolbarComponent,
    UiMaxlengthDirective,
    CalendarComponent,
    DatepickerComponent,
    UiOptionComponent,
    UiSwitchComponent,
    CalendarContentComponent,
    AddCalendarDirective,
    MainMenuComponent,
    MenuListComponent,
    MenuItemComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [...lib],
    exports: [...lib],
    entryComponents: [CalendarContentComponent]
})
export class SMNUIModule {
}
