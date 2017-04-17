import { Component, Attribute } from '@angular/core'

@Component({
	selector: 'ui-input' + 'ui-textarea',
	template: require('./input.component.html') + require('./textarea.component.html'), 
	styles: [require('./input.component.scss')]
})
export class inputComponent {
	label: string;
	type: string = 'text';
	name: string;
	value: string;
	disabled: boolean = false;
	required: boolean = false;
	placeholder: string;
	maxlength: string;
	readonly: boolean = false;
	ngModel: any;
	constructor(
		@Attribute('label') label: string,
		@Attribute('type') type: string,
		@Attribute('name') name: string,
		@Attribute('value') value: string,
		@Attribute('disabled') disabled: boolean,
		@Attribute('required') required: boolean,
		@Attribute('placeholder') placeholder: string,
		@Attribute('maxlength') maxlength: string,
		@Attribute('readonly') readonly: boolean,
		@Attribute('ngModel') ngModel: any,
	){
		this.label = label;
		this.type = type;
		this.name = name;
		this.value = value;
		this.disabled = disabled;
		this.required = required;
		this.placeholder = placeholder;
		this.maxlength = maxlength;
		this.readonly = readonly;
		this.ngModel = ngModel;
	}
}