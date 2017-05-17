import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'ui-menu-context',
	template: `
		<div class="ui-menu-wrapper">
			<div class="menu-user">
				<div *ngIf="imgContext.length > 0" [ui-perceptive]="imgContextColor" backcolor="true" class="user-image">{{ imgContext }}</div>
				<div *ngIf="usuarioContext.length > 0 || emailContext.length > 0" class="info">
					<div class="primary">{{ usuarioContext }}</div>
					<div class="secondary">{{ emailContext }}</div>
				</div>
				<ul class="content">
					<li ng-click="vm.logoff()">
						<a (click)="removeContext()" routerLink="login">
							Sair <i class="material-icons">power_settings_new</i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	`,
	styles: [require('./context-menu.component.scss').toString()], 
	encapsulation: ViewEncapsulation.None
})

export class MenuContextComponent{
	@Input() imgContext: any;
	@Input() imgContextColor: any;
	@Input() usuarioContext: any;
	@Input() emailContext: any;

	constructor(){}
	
	ngOnInit(){
		let background = document.createElement('div');
		let element = document.getElementById('userArea');

		background.className = 'background-context';
		background.style.display = 'none';

		element.addEventListener("click", this.renderContext);
		document.getElementsByTagName('ui-struct')[0].appendChild(background);
		background.addEventListener("click", this.removeContext);
	}
	removeContext(){
		document.getElementsByTagName('ui-menu-context')[0].className = "";
		document.getElementsByClassName('background-context')[0].setAttribute('style','display: none');
	}
	renderContext(){
		let menuContext: any = document.getElementsByTagName('ui-menu-context')[0];
		document.getElementsByClassName('background-context')[0].setAttribute('style','display: block');
		menuContext.className = "open"
	}
}
