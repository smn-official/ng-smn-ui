import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DemoComponent} from './demo/demo.component';
import {DemoInputComponent} from './demo/demo-input/demo-input.component';
import {DemoButtonComponent} from './demo/demo-button/demo-button.component';

const routes: Routes = [{
    path: '',
    component: DemoComponent,
    children: [
        {path: 'input', component: DemoInputComponent},
        {path: 'button', component: DemoButtonComponent}
    ]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
