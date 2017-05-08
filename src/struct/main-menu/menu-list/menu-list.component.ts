import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'ui-menu-list',
	template: `
		<ui-menu-item (isOpen)="MenuEvent($event)"
			[item]="item"
			[list]="item.opcoesFilhas"
			[level]="level"
			[class.is-open]="isOpened"
			*ngFor="let item of list"></ui-menu-item>
	`,
	styles: [require('./menu-list.component.scss').toString()],
	encapsulation: ViewEncapsulation.None
})

export class menuListComponent {
	@Input() list: any = '';
	@Input() parentLevel: any = '';

	level: any;
	item: any;
	isOpened: boolean;

	constructor() {}

	ngOnInit() {
		this.level = this.parentLevel + 1;
	}

	MenuEvent(event: any){
		this.isOpened = event.menuOpened;
	}
}