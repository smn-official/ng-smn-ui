import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core'

@Component({
	selector: 'ui-input',
	template: `
		<div #inputContainer class="ui-input-container">
			<ng-content></ng-content>
			<div class="line"></div>
		</div>
	`,
	styles: [require('./input.component.scss').toString()],
	encapsulation: ViewEncapsulation.None
})
export class inputComponent {
	@ViewChild('inputContainer') inputContainer: ElementRef;

	constructor() {}
	
	ngAfterViewInit(){
		let nativeElem = this.inputContainer.nativeElement;
		let elements = nativeElem.querySelectorAll('input, select, textarea')[0];
		let elementHas = elements.hasAttribute('ng-reflect-model');

		elements.setAttribute('class','ui-control');
		elementHas == true ? false : nativeElem.querySelector('.ui-control:not([ng-reflect-model])').setAttribute('ng-reflect-model','');
	}

}