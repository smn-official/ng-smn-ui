import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { UiInputContainerComponent } from './form/input/input-container.component';
import { UiInputDirective } from './form/input/input.directive';
import { OptionComponent } from './form/option/option.component';
import { MainMenuComponent } from './struct/main-menu/main-menu.component';
import { MenuListComponent } from './struct/main-menu/menu-list/menu-list.component';
import { MenuItemComponent } from './struct/main-menu/menu-item/menu-item.component';
import { TranslateComponent } from './animations/translate.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';

// Pipes
// import { DatePipe } from './filters/date.pipe';
// import { UnaccentPipe } from './filters/unaccent.pipe';

// Diretivas
import { AutofocusDirective } from './utils/autofocus/autofocus.directive';
import { PerceptiveDirective } from './perceptive/perceptive.directive';

export * from './form/input/input-container.component';
export * from './form/input/input.directive';
export * from './form/option/option.component';
export * from './struct/main-menu/main-menu.component';
export * from './struct/main-menu/menu-list/menu-list.component';
export * from './struct/main-menu/menu-item/menu-item.component';
export * from './animations/translate.component';
export * from './components/context-menu/context-menu.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [
		UiInputContainerComponent,
		UiInputDirective,
		OptionComponent,
		MainMenuComponent,
		MenuListComponent,
		MenuItemComponent,
		TranslateComponent,
		ContextMenuComponent,
		PerceptiveDirective,
		AutofocusDirective
		// UnaccentPipe,
		// DatePipe
	],
	exports: [
		UiInputContainerComponent,
		UiInputDirective,
		OptionComponent,
		MainMenuComponent,
		MenuListComponent,
		MenuItemComponent,
		TranslateComponent,
		ContextMenuComponent,
		PerceptiveDirective,
		AutofocusDirective
		// UnaccentPipe,
		// DatePipe
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
})
export class SMNUIModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SMNUIModule,
		};
	}
}
