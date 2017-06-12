import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SMNUIModule} from '../smn-ui/smn-ui.module';

import {DemoComponent} from './demo.component';
import { DemoInputComponent } from './demo-input/demo-input.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        SMNUIModule,
    ],
    declarations: [DemoComponent, DemoInputComponent],
    exports: [DemoComponent]
})
export class DemoModule {
}
