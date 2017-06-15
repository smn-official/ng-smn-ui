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

const routes: Routes = [{
    path: '',
    component: DemoComponent,
    children: [
        {path: 'inputs', component: DemoInputsComponent},
        {path: 'buttons', component: DemoButtonsComponent},
        {path: 'cards', component: DemoCardsComponent},
        {path: 'date-pickers', component: DemoDatePickersComponent},
        {path: 'selection-controls', component: DemoSelectionControlsComponent},
        {path: 'toolbars', component: DemoToolbarsComponent},
        {path: 'dividers', component: DemoDividersComponent},
    ]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
