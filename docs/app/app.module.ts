import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {SMNUIModule} from 'ng-smn-ui';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SMNUIModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
