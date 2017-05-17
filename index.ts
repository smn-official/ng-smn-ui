import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


/**
 * Pipes
 */

import { UnaccentPipe } from './src/filters/unaccent.pipe';
export * from './src/filters/unaccent.pipe';
import { DatePipe } from './src/filters/date.pipe';
export * from './src/filters/date.pipe';

/**
 * Component
 */
import { inputComponent } from './src/form/input/input.component';
export * from './src/form/input/input.component';
import { optionComponent } from './src/form/option/option.component';
export * from './src/form//option/option.component';
import { MenuContextComponent } from './src/components/context-menu/context-menu.component';
export * from './src/components/context-menu/context-menu.component';
import { MenuItemComponent } from './src/struct/main-menu/menu-item/menu-item.component';
export * from './src/struct/main-menu/menu-item/menu-item.component';
import { translateComponent } from './src/animations/translate.component';
import { mainMenuComponent } from './src/struct/main-menu/main-menu.component';
import { menuListComponent } from './src/struct/main-menu/menu-list/menu-list.component';

/**
 * Diretivas
 */
export * from './src/perceptive/perceptive.directive';
import { AutofocusDirective } from './src/utils/autofocus/autofocus.directive';
export * from './src/utils/autofocus/autofocus.directive';
import { PerceptiveDirective } from './src/perceptive/perceptive.directive';
// export * from './src/icon/hamburger/hamburger.component';
// import { ProfileFloatComponent } from './src/components/profile-float/profile-float.component';
// export * from './src/components/profile-float/profile-float.component';
// import { FloatingCardComponent } from './src/components/floating-card/floating-card.component';
// export * from './src/components/floating-card/floating-card.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  declarations: [
    AutofocusDirective,
    UnaccentPipe,
    DatePipe,
    inputComponent,
    optionComponent,
    translateComponent,
    mainMenuComponent,
    menuListComponent,
    MenuItemComponent,
    MenuContextComponent,
    PerceptiveDirective
    // ProfileFloatComponent,
    // FloatingCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    AutofocusDirective,
    UnaccentPipe,
    DatePipe,
    inputComponent,
    optionComponent,
    translateComponent,
    mainMenuComponent,
    menuListComponent,
    MenuItemComponent,
    MenuContextComponent,
    PerceptiveDirective
    // ProfileFloatComponent,
    // FloatingCardComponent
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
