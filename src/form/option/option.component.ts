import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
	selector: 'ui-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class optionComponent implements AfterViewInit {
	@ViewChild('labelOptions') labelOptions: ElementRef;

	constructor() {}

	ngAfterViewInit() {
		this.labelOptions.nativeElement.querySelector('input').setAttribute('class' , 'ui-control');
	}
}
