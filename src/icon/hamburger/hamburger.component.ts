import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'ui-hamburguer',
	template: `
		<button [class.dark]='!animated' (click)="animate()" class="xsmall icon ui-button">
			<div [class.back]='animated' class="ui-hamburger-icon">
				<div class="bar"></div>
				<div class="bar"></div>
				<div class="bar"></div>
			</div>
		</button>
	`,
	styles: [require('./hamburger.component.scss').toString()],
	encapsulation: ViewEncapsulation.None,
})

export class hamburgerComponent{
	color: string = '';
	animated: boolean = false;

	constructor() {}
	animate(){
		this.animated = !this.animated;
	}
}