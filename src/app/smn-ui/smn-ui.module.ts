import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UiInputContainerComponent } from './input/input-container.component';
import { UiInputDirective } from './input/input.directive';
import { UiToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    UiInputContainerComponent,
    UiInputDirective,
    UiToolbarComponent
  ],
  exports: [
    UiInputContainerComponent,
    UiInputDirective,
    UiToolbarComponent
  ]
})
export class SMNUIModule { }
