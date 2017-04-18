import { Component, Attribute } from '@angular/core'

@Component({
	selector: 'ui-input',
	template: require('./input.component.html'),
	styles: [require('./input.component.scss')]
})
export class inputComponent {
	label: string;
	constructor( @Attribute('label') label: string) {
		this.label = label;
	}
}