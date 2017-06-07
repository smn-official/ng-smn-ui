import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { AppComponent }     from './app.component';
import { SMNUIModule }  from 'ng-smn-ui';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        SMNUIModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
