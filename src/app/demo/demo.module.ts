import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SMNUIModule} from '../smn-ui/smn-ui.module';

import {DemoComponent} from './demo.component';
import {DemoInputsComponent} from './demo-inputs/demo-inputs.component';
import {DemoButtonsComponent} from './demo-buttons/demo-buttons.component';
import {DemoCardsComponent} from './demo-cards/demo-cards.component';
import {DemoDatePickersComponent} from './demo-date-pickers/demo-date-pickers.component';
import {DemoSelectionControlsComponent} from './demo-selection-controls/demo-selection-controls.component';
import {DemoToolbarsComponent} from './demo-toolbars/demo-toolbars.component';
import {DemoDividersComponent} from './demo-dividers/demo-dividers.component';
import {DemoLayoutComponent} from './demo-layout/demo-layout.component';
import {DemoDataTablesComponent} from './demo-data-tables/demo-data-tables.component';
import {DemoSnackbarComponent} from './demo-snackbar/demo-snackbar.component';
import {DemoProgressComponent} from './demo-progress/demo-progress.component';
import {DemoNavDrawerComponent} from './demo-nav-drawer/demo-nav-drawer.component';
import {DemoHomeComponent} from './demo-home/demo-home.component';
import {DemoSmartListComponent} from './demo-smart-list/demo-smart-list.component';
import {DemoMenuComponent} from './demo-menu/demo-menu.component';
import {DemoSubheaderComponent} from './demo-subheader/demo-subheader.component';
import {DemoMaskComponent} from './demo-mask/demo-mask.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        SMNUIModule
    ],
    declarations: [
        DemoComponent,
        DemoInputsComponent,
        DemoButtonsComponent,
        DemoCardsComponent,
        DemoSelectionControlsComponent,
        DemoToolbarsComponent,
        DemoDatePickersComponent,
        DemoDividersComponent,
        DemoLayoutComponent,
        DemoDataTablesComponent,
        DemoSnackbarComponent,
        DemoProgressComponent,
        DemoNavDrawerComponent,
        DemoHomeComponent,
        DemoSmartListComponent,
        DemoMenuComponent,
        DemoSubheaderComponent,
        DemoMaskComponent
    ],
    exports: [DemoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoModule {
}
