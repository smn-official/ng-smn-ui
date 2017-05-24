import { Component, Input, EventEmitter, Output, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MainMenuComponent } from './../main-menu.component';

@Component({
	selector: 'ui-menu-item',
	templateUrl: './menu-item.component.html',
	encapsulation: ViewEncapsulation.None,
})

export class MenuItemComponent{
	@Input() item: any;
	@Input() list: any;
	@Input() level: any;
	@Output() isOpen = new EventEmitter();

	isOpened = false;
	menuClick: any;

	constructor(private router: Router) { }

	openMenu(event: any) {
		if (this.item.opcoesFilhas) { this.isOpened = !this.isOpened; }
		this.isOpen.emit({ menuOpened: this.isOpened });
	}

	openLink() {
		// this.router.navigate(['/', this.item.url]);
		// let menu_click = "this.mainMenu.menuClick()";
		// eval(menu_click);
	}
}
