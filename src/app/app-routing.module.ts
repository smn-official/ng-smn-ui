import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DemoComponent} from './demo/demo.component';
import {DemoInputComponent} from './demo/demo-input/demo-input.component';
import {DemoButtonComponent} from './demo/demo-button/demo-button.component';
import {DemoCardComponent} from './demo/demo-card/demo-card.component';
import {DemoDatepickerComponent} from './demo/demo-datepicker/demo-datepicker.component';
import {DemoOptionComponent} from './demo/demo-option/demo-option.component';

const routes: Routes = [{
    path: '',
    component: DemoComponent,
    children: [
        {path: 'input', component: DemoInputComponent},
        {path: 'button', component: DemoButtonComponent},
        {path: 'card', component: DemoCardComponent},
        {path: 'picker', component: DemoDatepickerComponent},
        {path: 'card', component: DemoCardComponent},
        {path: 'option', component: DemoOptionComponent}
    ]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
