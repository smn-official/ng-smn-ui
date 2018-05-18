import {CUSTOM_ELEMENTS_SCHEMA, ElementRef, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import './button/button.service';
import {debounce} from './utils/functions/debounce';
import {unaccent} from './utils/functions/unaccent';
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
import {UiElementRef} from './utils/providers/element-ref.provider';
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
import {UiSmartListItemComponent} from './smart-list/item/item.component';
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
import {UiListComponent} from './list/list.component';
import {UiListItemsComponent} from './list/items/items.component';
import {UiListItemComponent} from './list/item/item.component';
import {UiSliderComponent} from './slider/slider.component';
import {UiSliderMultiHandleComponent} from './slider/slider-multi-handle.component';
import {UiInfiniteLoadDirective} from './utils/infinite-load/infinite-load.directive';
import {UiInfiniteLoadService} from './utils/infinite-load/infinite-load.service';
import {UiAutocompleteDirective} from './autocomplete/autocomplete.directive';
import {UiAutocompleteComponent} from './autocomplete/autocomplete.component';
import {UiMaskIntegerDirective} from './utils/masks/integer/mask-integer.directive';
import {UiTabsComponent} from './tabs/tabs.component';
import {UiTabsPagesComponent} from './tabs/pages/tabs-pages.component';
import {UiLazyLoadDirective} from './lazy-load/lazy-load.directive';
import {UiDataTableComponent} from './data-table/data-table.component';
import {UiBottomSheetComponent} from './bottom-sheet/bottom-sheet.component';
import {UiBottomSheetTriggerDirective} from './bottom-sheet/bottom-sheet.directive';
import {UiInputFileDirective} from './input/input-file.directive';
import {UiEllipsisDirective} from './ellipsis/ellipsis.directive';
import {UiRequiredDirective} from './utils/validators/required.directive';
import {UiColorPickerComponent} from './color-picker/color-picker.component';
import {UiColorPickerDirective} from './color-picker/color-picker.directive';
import {UiInputAutosizeDirective} from './input/autosize.directive';
import {UiClockComponent} from './clock/clock.component';
import {UiTimePickerService} from './time-picker/time-picker.service';
import {UiTimePickerDirective} from './time-picker/time-picker.directive';
import {UiTimePickerCallerDirective} from './time-picker/time-picker-caller.directive';
import {UiTimePipe} from './utils/masks/time/time.pipe';
import {UiMaskTimeDirective} from './utils/masks/time/mask-time.directive';
import {UiMaskCurrencyDirective} from './utils/masks/currency/mask-currency.directive';
import {UiCurrencyPipe} from './utils/masks/currency/currency.pipe';
import {UiDialog} from './dialog/dialog.service';
import {UiSelectComponent} from './select/select.component';
import {UiSelectOptionComponent} from './select/option/option.component';
import {UiSelectFilterPipe} from './select/select-filter.pipe';
import {UiFilterPipe} from './utils/pipes/filter.pipe';
import {UiAvatarComponent} from './avatar/avatar.component';
import {UiMaskFloatDirective} from './utils/masks/float/mask-float.directive';

export {
    debounce,
    unaccent,
    UiColor,
    UiCookie,
    UiElement,
    UiElementRef,
    UiSnackbar,
    UiToolbarService,
    UiWindowRef,
    UiCpfPipe,
    UiCnpjPipe,
    UiCepPipe,
    UiPhonePipe,
    UiInfiniteLoadService,
    UiDatetimeService,
    UiTimePipe,
    UiCurrencyPipe,
    UiMaskPhoneDirective,
    UiDialog,
    UiFilterPipe
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
    UiSmartListItemComponent,
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
    UiListComponent,
    UiListItemsComponent,
    UiListItemComponent,
    UiPhonePipe,
    UiSliderComponent,
    UiSliderMultiHandleComponent,
    UiInfiniteLoadDirective,
    UiAutocompleteDirective,
    UiAutocompleteComponent,
    UiMaskIntegerDirective,
    UiTabsComponent,
    UiTabsPagesComponent,
    UiLazyLoadDirective,
    UiDataTableComponent,
    UiLazyLoadDirective,
    UiBottomSheetComponent,
    UiBottomSheetTriggerDirective,
    UiInputFileDirective,
    UiEllipsisDirective,
    UiRequiredDirective,
    UiColorPickerComponent,
    UiColorPickerDirective,
    UiInputAutosizeDirective,
    UiColorPickerDirective,
    UiClockComponent,
    UiTimePickerDirective,
    UiTimePickerCallerDirective,
    UiTimePipe,
    UiMaskTimeDirective,
    UiMaskCurrencyDirective,
    UiCurrencyPipe,
    UiSelectComponent,
    UiSelectOptionComponent,
    UiSelectFilterPipe,
    UiFilterPipe,
    UiAvatarComponent,
    UiMaskFloatDirective
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        BrowserAnimationsModule
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
        UiInfiniteLoadService,
        UiTimePickerService,
        UiDialog,
    ],
    entryComponents: [
        UiCalendarComponent,
        UiCalendarContentComponent,
        UiAutocompleteComponent,
        UiColorPickerComponent,
        UiClockComponent
    ]
})
export class SMNUIModule {
}
