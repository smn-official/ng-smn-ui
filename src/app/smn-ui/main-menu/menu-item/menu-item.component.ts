import { Component, Input, EventEmitter, Output, ViewEncapsulation, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MainMenuComponent } from './../main-menu.component';
import { Observable } from 'rxjs/Observable';


@Component({
	selector: 'ui-menu-item',
	templateUrl: './menu-item.component.html',
	styleUrls: ['./menu-item.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class MenuItemComponent{
	@Input() item: any;
	@Input() list: any;
	@Input() level: any;
	@Output() isOpen = new EventEmitter();

	isOpened = false;

	constructor(private router: Router, private mainMenu: MainMenuComponent) {
	}

	openMenu(event: any) {
		this.isOpened = !this.isOpened;
		this.isOpen.emit({ menuOpened: this.isOpened });
	}

	openLink() {
		this.router.navigate(['/', this.item.url]);
	}
}