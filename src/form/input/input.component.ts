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
		this.inputContainer.nativeElement.querySelectorAll('input, select, textarea')[0].setAttribute('class','ui-control');
	}
}