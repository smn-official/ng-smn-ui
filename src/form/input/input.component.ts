import { Component, Attribute, OnInit  } from '@angular/core'

@Component({
	selector: 'ui-input',
	template: require('./input.component.html'), 
	styles: [require('./input.component.scss')]
})
export class inputComponent implements OnInit {
	_label: string = '';
	_type: string = 'text';
	_name: string = '';
	_value: string = '';
	_disabled: boolean = false;
	_required: any;
	constructor(
		@Attribute('label') label: string,
		@Attribute('type') type: string,
		@Attribute('name') name: string,
		@Attribute('value') value: string,
		@Attribute('disabled') disabled: boolean,
		@Attribute('required') required: any,
	){
		this._label = label;
		this._type = type;
		this._name = name;
		this._value = value;
		this._disabled = disabled;
		this._required;
	}

	ngOnInit() {
    }
}