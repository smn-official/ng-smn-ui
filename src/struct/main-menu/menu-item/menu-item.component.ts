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
		<ui-menu-list [style.height]="list && isOpened ? 'auto' : '0'"  class="drawer-slide-vertical" [list]="list" [parent-level]="level"></ui-menu-list>
	`,
	styles: [require('./menu-item.component.scss').toString()],
	encapsulation: ViewEncapsulation.None,
})

export class MenuItemComponent {
	@Input() item: any;
	@Input() list: any;
	@Input() level: any;
	@Output() isOpen = new EventEmitter();

	isOpened: boolean = false;

	constructor(private router: Router) { }

	ngAfterContentChecked() {
		document.getElementById('menuActive').addEventListener('click', this.renderMenu);
		document.getElementsByTagName('ui-drawer-background')[0].addEventListener('click', this.renderMenu);
	}

	renderMenu(){
		let uiDrawer = document.getElementsByTagName('ui-drawer')[0];

		if(uiDrawer.classList.contains('open')){
			uiDrawer.classList.remove('open');
			document.getElementById('menuActive').classList.add('dark');
			document.querySelector('#menuActive div').classList.remove('back');
			document.getElementsByTagName('ui-drawer-background')[0].classList.remove('show');
		}
		else{
			uiDrawer.classList.add('open');
			document.getElementById('menuActive').classList.remove('dark');
			document.querySelector('#menuActive div').classList.add('back');
			document.getElementsByTagName('ui-drawer-background')[0].classList.add('show');
		}
	}

	openMenu(event: any) {
		if (this.item.opcoesFilhas) this.isOpened = !this.isOpened;
		this.isOpen.emit({ menuOpened: this.isOpened });
	}
	openLink(){
		// this.router.navigate(['/', this.item.url]);
		this.renderMenu();
	}
}