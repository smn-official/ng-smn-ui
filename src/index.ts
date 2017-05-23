import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Pipes
import { UnaccentPipe } from './filters/unaccent.pipe';
import { DatePipe } from './filters/date.pipe';

// Components
import { inputComponent } from './form/input/input.component';
import { optionComponent } from './form/option/option.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { MenuItemComponent } from './struct/main-menu/menu-item/menu-item.component';
import { translateComponent } from './animations/translate.component';
import { MainMenuComponent } from './struct/main-menu/main-menu.component';
import { MenuListComponent } from './struct/main-menu/menu-list/menu-list.component';

// Diretivas
import { AutofocusDirective } from './utils/autofocus/autofocus.directive';
import { PerceptiveDirective } from './perceptive/perceptive.directive';

// Exports
export * from './filters/unaccent.pipe';
export * from './filters/date.pipe';
export * from './form/input/input.component';
export * from './form//option/option.component';
export * from './components/context-menu/context-menu.component';
export * from './struct/main-menu/menu-item/menu-item.component';
export * from './perceptive/perceptive.directive';
export * from './utils/autofocus/autofocus.directive';

@NgModule({
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		RouterModule
	],
	declarations: [
		inputComponent,
		AutofocusDirective,
		UnaccentPipe,
		DatePipe,
		optionComponent,
		translateComponent,
		MainMenuComponent,
		MenuListComponent,
		MenuItemComponent,
		ContextMenuComponent,
		PerceptiveDirective
	],
	exports: [
		AutofocusDirective,
		UnaccentPipe,
		DatePipe,
		inputComponent,
		optionComponent,
		translateComponent,
		MainMenuComponent,
		MenuListComponent,
		MenuItemComponent,
		ContextMenuComponent,
		PerceptiveDirective
	]
})
export class SMNUI4Module {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SMNUI4Module
		};
	}
}
