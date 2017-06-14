import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToolbarService } from '../smn-ui/toolbar/toolbar.service';

@Component({
	selector: 'demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [ToolbarService]
})
export class DemoComponent implements OnInit {
	title: String;
	openMenu: boolean;
	menuList = {
		'result': {
			'opcoes': [
				{
					'idOpcao': 1,
					'idOpcaoMae': null,
					'nomeOpcao': 'Components',
				},
				{
					'idOpcao': 2,
					'idOpcaoMae': 1,
					'nomeOpcao': 'Buttons',
					'url': 'button'
				},
				{
					'idOpcao': 3,
					'idOpcaoMae': 1,
					'nomeOpcao': 'Cards',
					'url': 'card'
				},
				{
					'idOpcao': 4,
					'idOpcaoMae': 1,
					'nomeOpcao': 'Forms',
				},
				{
					'idOpcao': 5,
					'idOpcaoMae': 4,
					'nomeOpcao': 'Input Fields',
					'url': 'input',
				},
				{
					'idOpcao': 6,
					'idOpcaoMae': 4,
					'nomeOpcao': 'Selection Control',
					'url': 'selection-control',
				},
				{
					'idOpcao': 7,
					'idOpcaoMae': 1,
					'nomeOpcao': 'Toolbar',
					'url': 'toolbar',
				}
			]
		}
	}



	constructor(private titleService: Title, private toolbarService: ToolbarService) {
		toolbarService.titleChange.subscribe(title => {
			this.title = title;
		});
	}

	activeMenu() {
		this.openMenu = !this.openMenu;
	}

	ngOnInit() {
		this.openMenu = false;
		this.titleService.setTitle('SMN UI Demos');
		this.toolbarService.setTitle('SMN UI Demos');
	}

}
