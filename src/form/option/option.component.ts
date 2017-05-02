import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core'

@Component({
	selector: 'ui-option',
	template: `
        <label #labelOptions>
            <ng-content select="input"></ng-content>
            <div class="ui-option-shell">
                <div class="ui-option-fill"></div>
                <div class="ui-option-mark"></div>
            </div>
            <ng-content select="span"></ng-content>
        </label>
	`,
	styles: [require('./option.component.scss').toString()],
	encapsulation: ViewEncapsulation.None
})
export class optionComponent {
	@ViewChild('labelOptions') labelOptions: ElementRef;

	constructor() {}
	
	ngAfterViewInit(){
		this.labelOptions.nativeElement.querySelector('input').setAttribute('class','ui-control');
	}

}