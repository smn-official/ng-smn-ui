import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
	selector: 'ui-input-container',
	templateUrl: './input.component.html',
	encapsulation: ViewEncapsulation.None
})

export class InputComponent implements AfterViewInit {
	@ViewChild('inputContainer') inputContainer: ElementRef;

	constructor() {}

	ngAfterViewInit() {
		let nativeElem = this.inputContainer.nativeElement;
		let elements = nativeElem.querySelectorAll('input, select, textarea')[0];
		let elementHas = elements.hasAttribute('ng-reflect-model');

		elements.setAttribute('class' , 'ui-control');
		elementHas === true ? false : nativeElem.querySelector('.ui-control:not([ng-reflect-model])').setAttribute('ng-reflect-model' , '');
	}
}
