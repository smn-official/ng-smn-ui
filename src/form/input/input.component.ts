import { Component, Attribute, ViewChild, ElementRef } from '@angular/core'

@Component({
	selector: 'ui-input',
	template: require('./input.component.html'),
	styles: [require('./input.component.scss')]
})
export class inputComponent {
	@ViewChild('inputContainer') inputContainer: ElementRef;
	
	label: string;

	constructor(@Attribute('label') label: string) {
		this.label = label;
	}
	
	ngAfterViewInit(){
		let elements = this.inputContainer.nativeElement.querySelectorAll('input, select, textarea')[0];
		elements.setAttribute('_ngcontent-c1','');
		elements.setAttribute('class','ui-control');
	}
}