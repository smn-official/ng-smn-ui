import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DemoComponent} from './demo/demo.component';
import {DemoButtonsComponent} from './demo/demo-buttons/demo-buttons.component';
import {DemoCardsComponent} from './demo/demo-cards/demo-cards.component';
import {DemoDataTablesComponent} from './demo/demo-data-tables/demo-data-tables.component';
import {DemoDatePickersComponent} from './demo/demo-date-pickers/demo-date-pickers.component';
import {DemoDialogComponent} from './demo/demo-dialog/demo-dialog.component';
import {DemoDividersComponent} from './demo/demo-dividers/demo-dividers.component';
import {DemoHomeComponent} from './demo/demo-home/demo-home.component';
import {DemoInputsComponent} from './demo/demo-inputs/demo-inputs.component';
import {DemoChipsComponent} from './demo/demo-chips/demo-chips.component';
import {DemoLayoutComponent} from './demo/demo-layout/demo-layout.component';
import {DemoMenuComponent} from './demo/demo-menu/demo-menu.component';
import {DemoNavDrawerComponent} from './demo/demo-nav-drawer/demo-nav-drawer.component';
import {DemoProgressComponent} from './demo/demo-progress/demo-progress.component';
import {DemoSelectionControlsComponent} from './demo/demo-selection-controls/demo-selection-controls.component';
import {DemoSmartListComponent} from './demo/demo-smart-list/demo-smart-list.component';
import {DemoSnackbarComponent} from './demo/demo-snackbar/demo-snackbar.component';
import {DemoSubheaderComponent} from './demo/demo-subheader/demo-subheader.component';
import {DemoToolbarsComponent} from './demo/demo-toolbars/demo-toolbars.component';
import {DemoMaskComponent} from './demo/demo-mask/demo-mask.component';
import {DemoSliderComponent} from './demo/demo-slider/demo-slider.component';
import {DemoListComponent} from './demo/demo-list/demo-list.component';
import {DemoAutocompleteComponent} from './demo/demo-autocomplete/demo-autocomplete.component';
import {DemoBottomSheetComponent} from './demo/demo-bottom-sheet/demo-bottom-sheet.component';
import {DemoFileComponent} from './demo/demo-file/demo-file.component';
import {DemoColorPickersComponent} from './demo/demo-color-pickers/demo-color-pickers.component';
import {DemoClockComponent} from './demo/demo-clock/demo-clock.component';
import {DemoTimePickersComponent} from './demo/demo-time-pickers/demo-time-pickers.component';
import {DemoTabsComponent} from './demo/demo-tabs-pages/demo-tabs/demo-tabs.component';
import {DemoTabsPagesComponent} from './demo/demo-tabs-pages/demo-tabs-pages.component';
import {DemoPagesComponent} from './demo/demo-tabs-pages/demo-pages/demo-pages.component';
import {DemoInfiniteLoadComponent} from './demo/demo-infinite-load/demo-infinite-load.component';
import {DemoSelectComponent} from './demo/demo-select/demo-select.component';
import {DemoAvatarComponent} from './demo/demo-avatar/demo-avatar.component';
import {DemoTooltipComponent} from "./demo/demo-tooltip/demo-tooltip.component";
import {DemoGridComponent} from './demo/demo-grid/demo-grid.component';
import {DemoChosenComponent} from './demo/demo-chosen/demo-chosen.component';

const routes: Routes = [
    {
        path: '',
        component: DemoComponent,
        children: [
            {path: '', component: DemoHomeComponent},
            {path: 'autocomplete', component: DemoAutocompleteComponent},
            {path: 'avatar', component: DemoAvatarComponent},
            {path: 'bottom-sheets', component: DemoBottomSheetComponent},
            {path: 'buttons', component: DemoButtonsComponent},
            {path: 'cards', component: DemoCardsComponent},
            {path: 'clocks', component: DemoClockComponent},
            {path: 'color-pickers', component: DemoColorPickersComponent},
            {path: 'data-tables', component: DemoDataTablesComponent},
            {path: 'date-pickers', component: DemoDatePickersComponent},
            {path: 'dialog', component: DemoDialogComponent},
            {path: 'dividers', component: DemoDividersComponent},
            {path: 'files', component: DemoFileComponent},
            {path: 'grid', component: DemoGridComponent},
            {path: 'inputs', component: DemoInputsComponent},
            {path: 'chips', component: DemoChipsComponent},
            {path: 'layout', component: DemoLayoutComponent},
            {path: 'menus', component: DemoMenuComponent},
            {path: 'nav-drawer', component: DemoNavDrawerComponent},
            {path: 'progress', component: DemoProgressComponent},
            {path: 'selection-controls', component: DemoSelectionControlsComponent},
            {path: 'smart-list', component: DemoSmartListComponent},
            {path: 'snackbars', component: DemoSnackbarComponent},
            {path: 'masks', component: DemoMaskComponent},
            {path: 'menus', component: DemoMenuComponent},
            {path: 'sliders', component: DemoSliderComponent},
            {path: 'smart-list', component: DemoSmartListComponent},
            {path: 'subheader', component: DemoSubheaderComponent},
            {path: 'time-pickers', component: DemoTimePickersComponent},
            {path: 'toolbars', component: DemoToolbarsComponent},
            {path: 'tooltips', component: DemoTooltipComponent},
            {path: 'list', component: DemoListComponent},
            {path: 'tabs-pages', component: DemoTabsPagesComponent},
            {path: 'tabs', component: DemoTabsComponent},
            {path: 'pages', component: DemoPagesComponent},
            {path: 'infinite-load', component: DemoInfiniteLoadComponent},
            {path: 'select', component: DemoSelectComponent},
            {path: 'chosen', component: DemoChosenComponent},
        ]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
