import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorDirective } from './src/directives/color.directive';
export * from './src/directives/color.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ColorDirective,
  ],
  exports: [
    ColorDirective,
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
