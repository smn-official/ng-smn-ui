import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
	selector: 'ui-option',
	templateUrl: './option.component.html',
	encapsulation: ViewEncapsulation.None
})
export class OptionComponent implements AfterViewInit {
	@ViewChild('labelOptions') labelOptions: ElementRef;

	constructor() {}

	ngAfterViewInit() {
		this.labelOptions.nativeElement.querySelector('input').setAttribute('class' , 'ui-option');
	}
}
