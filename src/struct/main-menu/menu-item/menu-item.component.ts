import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'ui-menu-item',
	template: `
		<div class="item-wrap">
		</div>
	`,
	styles: [require('./menu-item.component.scss').toString()]
})
			// <a [href]="{{item[config.href] || ''}}" [ngClass]="{'has-submenu': item[config.submenu]}" (click)="item[config.submenu] ? openMenu() : (item[config.href] && menuClick())">
			// 	<i class="material-icons option-icon"
			// 		[ngClass]="{'arrow-drop': item[config.submenu]}"
			// 		*ngIf="item[config.submenu] || item[config.icon]">
			// 		{{item[config.icon] || 'arrow_drop_down'}}
			// 	</i>
			// 	{{item[config.name]}}
			// </a>

export class menuItemComponent{
	@Input() item: any;
	@Input() list: any;
	@Input() level: any;
	@Input() isOpen: any;

	constructor(){}

	ngOnInit(){
		this.isOpen = false
	}
}