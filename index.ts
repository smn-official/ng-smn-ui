import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerceptiveDirective } from './src/perceptive/perceptive.directive';
import { AutofocusDirective } from './src/utils/autofocus/autofocus.directive';
export * from './src/utils/autofocus/autofocus.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PerceptiveDirective,
    AutofocusDirective
  ],
  exports: [
    PerceptiveDirective,
    AutofocusDirective
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
