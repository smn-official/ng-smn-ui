import { Component, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'ui-translate-x',
	template: `
		<div [@translateAnimate]='state'>
			<ng-content></ng-content>
		</div>
	`,
	animations: [
		trigger('translateAnimate', [
			state('hide', style({
				transform: 'translate(-100vw)',
			})),
			state('show', style({
				transform: 'translate(0)',
			})),
			transition('hide => show', animate('600ms ease-in-out')),
		]),
	]
})

export class TranslateComponent implements AfterViewInit{
	state: string = 'hide';

	constructor() {}

	ngAfterViewInit() {
		this.state = 'show';
	}
}
