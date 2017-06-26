import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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
import {DemoProgressComponent} from "./demo-progress/demo-progress.component";

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
        DemoProgressComponent
    ],
    exports: [DemoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoModule {
}
