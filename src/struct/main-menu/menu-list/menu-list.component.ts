import { Component, Input } from '@angular/core';

@Component({
	selector: 'ui-menu-list',
	template: `
		<ui-menu-item
			[item]="item"
			[list]="item"
			[level]="level"
			[is-open]="isOpen"
			[class.is-open]="isOpen"
			*ngFor="let item of list">{{item.nomeOpcao}}</ui-menu-item>
	`,
	styles: [require('./menu-list.component.scss').toString()],
})

export class menuListComponent {
	@Input() list: any = '';
	@Input() parentLevel: any = '';;

	level: any;

	constructor() { }

	ngOnInit() {
		this.level = this.parentLevel + 1;
	}
}