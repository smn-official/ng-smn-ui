import {Component, ViewEncapsulation, OnInit, AfterViewInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiCookie, UiToolbarService} from '../smn-ui/smn-ui.module';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [UiToolbarService]
})
export class DemoComponent implements OnInit, AfterViewInit {
    title: String;
    menuOpen: boolean;

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        toolbarService.change.subscribe(title => {
            this.title = title;
        });
    }

    ngOnInit() {
        this.titleService.setTitle('SMN UI Demos');
        this.toolbarService.set('SMN UI Demos');
        this.menuOpen = false;

        const isNavDrawerPersistent = UiCookie.get('NavDrawerPersistent') === 'true';

        if (isNavDrawerPersistent) {
            this.menuOpen = true;
        }

        this.toolbarService.registerMainToolbar(document.getElementById('app-header'));
    }

    ngAfterViewInit() {
    }
}
