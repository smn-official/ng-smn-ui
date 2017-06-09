import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SMNUIModule } from '../smn-ui/smn-ui.module';

import { DemoComponent } from './demo.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SMNUIModule
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent]
})
export class DemoModule {
}
