import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerceptiveDirective } from './src/directives/perceptive.directive';
export * from './src/directives/perceptive.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PerceptiveDirective,
  ],
  exports: [
    PerceptiveDirective,
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
