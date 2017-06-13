import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DemoComponent} from './demo/demo.component';
import {DemoInputComponent} from './demo/demo-input/demo-input.component';
import {DemoButtonComponent} from './demo/demo-button/demo-button.component';
import {DemoCardComponent} from './demo/demo-card/demo-card.component';
import {DemoDatepickerComponent} from './demo/demo-datepicker/demo-datepicker.component';
import {DemoSelectionControlComponent} from './demo/demo-selection-control/demo-selection-control.component';
import {DemoToolbarComponent} from './demo/demo-toolbar/demo-toolbar.component';

const routes: Routes = [{
    path: '',
    component: DemoComponent,
    children: [
        {path: 'input', component: DemoInputComponent},
        {path: 'button', component: DemoButtonComponent},
        {path: 'card', component: DemoCardComponent},
        {path: 'picker', component: DemoDatepickerComponent},
        {path: 'selection-control', component: DemoSelectionControlComponent},
        {path: 'toolbar', component: DemoToolbarComponent}
    ]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
