import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DemoComponent} from './demo/demo.component';
import {DemoInputsComponent} from './demo/demo-inputs/demo-inputs.component';
import {DemoButtonsComponent} from './demo/demo-buttons/demo-buttons.component';
import {DemoCardsComponent} from './demo/demo-cards/demo-cards.component';
import {DemoDatePickersComponent} from './demo/demo-date-pickers/demo-date-pickers.component';
import {DemoSelectionControlsComponent} from './demo/demo-selection-controls/demo-selection-controls.component';
import {DemoToolbarsComponent} from './demo/demo-toolbars/demo-toolbars.component';
import {DemoDividersComponent} from './demo/demo-dividers/demo-dividers.component';
import {DemoLayoutComponent} from './demo/demo-layout/demo-layout.component';
import {DemoDataTablesComponent} from './demo/demo-data-tables/demo-data-tables.component';
import {DemoSnackbarComponent} from './demo/demo-snackbar/demo-snackbar.component';
import {DemoProgressComponent} from './demo/demo-progress/demo-progress.component';
import {DemoNavDrawerComponent} from './demo/demo-nav-drawer/demo-nav-drawer.component';
import {DemoHomeComponent} from './demo/demo-home/demo-home.component';
import {DemoSmartListComponent} from './demo/demo-smart-list/demo-smart-list.component';
import {DemoMenuComponent} from './demo/demo-menu/demo-menu.component';
import {DemoSubheaderComponent} from './demo/demo-subheader/demo-subheader.component';
import {DemoMaskComponent} from './demo/demo-mask/demo-mask.component';

const routes: Routes = [
    {
        path: '',
        component: DemoComponent,
        children: [
            {path: '', component: DemoHomeComponent},
            {path: 'inputs', component: DemoInputsComponent},
            {path: 'buttons', component: DemoButtonsComponent},
            {path: 'cards', component: DemoCardsComponent},
            {path: 'date-pickers', component: DemoDatePickersComponent},
            {path: 'selection-controls', component: DemoSelectionControlsComponent},
            {path: 'toolbars', component: DemoToolbarsComponent},
            {path: 'dividers', component: DemoDividersComponent},
            {path: 'layout', component: DemoLayoutComponent},
            {path: 'data-tables', component: DemoDataTablesComponent},
            {path: 'snackbars', component: DemoSnackbarComponent},
            {path: 'progress', component: DemoProgressComponent},
            {path: 'nav-drawer', component: DemoNavDrawerComponent},
            {path: 'masks', component: DemoMaskComponent},
            {path: 'menus', component: DemoMenuComponent},
            {path: 'smart-list', component: DemoSmartListComponent},
            {path: 'subheader', component: DemoSubheaderComponent},
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
