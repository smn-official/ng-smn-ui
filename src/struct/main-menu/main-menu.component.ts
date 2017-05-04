import { Component } from '@angular/core';

@Component({
	selector: 'ui-menu-list',
	template: `
		<div class="drawer-slide"></div>
	`,
	styles: [require('./main-menu.component.scss').toString()]
})

export class mainMenuComponent{
	constructor(){}
}