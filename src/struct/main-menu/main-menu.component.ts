import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'ui-main-menu',
	template: `
		<ui-menu-list
			class="drawer-slide"
			[list]="menuList"
			[parent-level]="level">
		</ui-menu-list>
	`,
	styles: [require('./main-menu.component.scss').toString()]
})

export class mainMenuComponent {
	@Input('menu-list') menuList: any = '';
	@Output() menuClick = new EventEmitter();

	level: any = 0;

	constructor() {}

	public iteratePristineMenu(allItems: any): any {
		allItems.sort((a: any, b: any) => {
			if (a.nomeOpcao < b.nomeOpcao) return -1;
			if (a.nomeOpcao > b.nomeOpcao) return 1;
			return 0;
		})
		let remainingList: any = [],
			newMenu = allItems.filter(function (item: any) {
				item.idOpcaoMae !== null && remainingList.push(item);
				return item.idOpcaoMae === null;
			});
		return this.iterateOptionsMenu(newMenu, remainingList)[0];
	}

	private iterateOptionsMenu(list: any, fullList: any) {
		let remainingList: any;
		for (let i = 0; i < list.length; i++) {
			remainingList = [];
			let target = list[i],
				subMenus = fullList.filter(function (item: any) {
					item.idOpcaoMae !== target.idOpcao && remainingList.push(item);
					return item.idOpcaoMae === target.idOpcao;
				});
			if (subMenus.length) {
				target.opcoesFilhas = subMenus;
				remainingList = this.iterateOptionsMenu(target.opcoesFilhas, remainingList)[1];
			}
		}
		return [list, remainingList];
	}

	ngOnInit() {
		console.log(this.menuList, "ERROU");
		this.menuList = this.iteratePristineMenu(this.menuList);
		console.log(this.menuList, "ORDENOU");
	}

}