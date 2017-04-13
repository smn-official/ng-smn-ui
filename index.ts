import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Diretivas
 */
import { PerceptiveDirective } from './src/perceptive/perceptive.directive';
import { AutofocusDirective } from './src/utils/autofocus/autofocus.directive';
export * from './src/perceptive/perceptive.directive';
export * from './src/utils/autofocus/autofocus.directive';

/**
 * Pipes
 */

import { UnaccentPipe } from './src/filters/unaccent.pipe';
export * from './src/filters/unaccent.pipe';
import { DatePipe } from './src/filters/date.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PerceptiveDirective,
    AutofocusDirective,
    UnaccentPipe,
    DatePipe
  ],
  exports: [
    PerceptiveDirective,
    AutofocusDirective,
    UnaccentPipe,
    DatePipe
  ]
})
export class SMNUI4Module {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SMNUI4Module,
      providers: []
    };
  }
}
