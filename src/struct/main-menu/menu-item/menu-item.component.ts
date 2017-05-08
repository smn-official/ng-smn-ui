import { Component, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'ui-menu-item',
	template: `
		<div class="item-wrap">
			<a [ngClass]="{'has-submenu': item.opcoesFilhas}" (click)="item.opcoesFilhas ? openMenu() : openLink()">
				<i class="material-icons option-icon"
					[ngClass]="{'arrow-drop': item.opcoesFilhas}"
					*ngIf="item.opcoesFilhas">
					arrow_drop_down
				</i>
				{{item.nomeOpcao}}
			</a>
		</div>
		<ui-menu-list *ngIf="list && isOpened" class="drawer-slide-vertical" [list]="list" [parent-level]="level"></ui-menu-list>
	`,
	styles: [require('./menu-item.component.scss').toString()],
	encapsulation: ViewEncapsulation.None,
})

export class menuItemComponent {
	@Input() item: any;
	@Input() list: any;
	@Input() level: any;
	@Output() isOpen = new EventEmitter();

	isOpened: boolean = false;

	constructor(private router: Router) { }

	openMenu() {
		if (this.item.opcoesFilhas) this.isOpened = !this.isOpened;
		this.isOpen.emit({ menuOpened: this.isOpened });
	}
	openLink(){
		this.router.navigate(['/', this.item.url]);
	}
}