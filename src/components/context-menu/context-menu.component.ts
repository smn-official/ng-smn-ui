import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';

@Component({
	selector: 'ui-menu-context',
	templateUrl: './context-menu.component.html',
	styleUrls: ['./context-menu.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ContextMenuComponent implements OnInit {
	@Input() imgContext: any;
	@Input() imgContextColor: any;
	@Input() usuarioContext: any;
	@Input() emailContext: any;

	constructor() {}

	ngOnInit() {
		let background = document.createElement('div');
		let element = document.getElementById('userArea');

		background.className = 'background-context';
		background.style.display = 'none';

		element.addEventListener('click', this.renderContext);
		document.getElementsByTagName('ui-struct')[0].appendChild(background);
		background.addEventListener('click', this.removeContext);
	}
	removeContext() {
		document.getElementsByTagName('ui-menu-context')[0].className = '';
		document.getElementsByClassName('background-context')[0].setAttribute('style' , 'display: none');
	}
	renderContext() {
		let menuContext: any = document.getElementsByTagName('ui-menu-context')[0];
		document.getElementsByClassName('background-context')[0].setAttribute('style' , 'display: block');
		menuContext.className = 'open';
	}
}
