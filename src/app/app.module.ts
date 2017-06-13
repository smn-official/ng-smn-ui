import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DemoModule} from './demo/demo.module';

import {WindowRef} from './smn-ui/providers/window.provider';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DemoModule,
        AppRoutingModule
    ],
    providers: [WindowRef],
    bootstrap: [AppComponent]
})
export class AppModule {
}
