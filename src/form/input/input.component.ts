import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core'

@Component({
	selector: 'ui-input',
	template: require('./input.component.html'),
	styles: [require('./input.component.scss')],
	encapsulation: ViewEncapsulation.None
})
export class inputComponent {
	@ViewChild('inputContainer') inputContainer: ElementRef;

	constructor() {}
	
	ngAfterViewInit(){
		let elements = this.inputContainer.nativeElement.querySelectorAll('input, select, textarea')[0];
		elements.setAttribute('class','ui-control');
	}
}