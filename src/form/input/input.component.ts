import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
	selector: 'ui-input',
	templateUrl: './input.component.html',
	encapsulation: ViewEncapsulation.None
})

export class InputComponent implements AfterViewInit {
	@ViewChild('inputContainer') inputContainer: ElementRef;

	constructor() {}

	ngAfterViewInit() {
		let nativeElem = this.inputContainer.nativeElement;
		let elements = nativeElem.querySelectorAll('input, select, textarea')[0];
		elements.classList.add(' ui-control');

		elements.addEventListener('blur', () => {
			if (this.inputContainer.nativeElement.getElementsByClassName('ui-control')[0].value.length === 0) {
				this.inputContainer.nativeElement.getElementsByClassName('ui-control')[0].classList.remove('active');
			}
		});
		elements.addEventListener('focus', () => {
			this.inputContainer.nativeElement.getElementsByClassName('ui-control')[0].classList.add('active');
		});
	}
}
