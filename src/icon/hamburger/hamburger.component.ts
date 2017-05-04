import { Component } from '@angular/core';

@Component({
	selector: 'ui-hamburger',
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
})

export class hamburgerComponent{
	animated: boolean = false;

	constructor() {}
	animate(){
		this.animated = !this.animated;
	}
}