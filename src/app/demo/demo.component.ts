import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiCookie, UiToolbarService} from '../smn-ui/smn-ui.module';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [UiToolbarService]
})
export class DemoComponent implements OnInit {
    title: String;
    menuOpen: boolean;

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        toolbarService.titleChange.subscribe(title => {
            this.title = title;
        });
    }

    ngOnInit() {
        this.titleService.setTitle('SMN UI Demos');
        this.toolbarService.setTitle('SMN UI Demos');
        this.menuOpen = false;

        const isNavDrawerPersistent = UiCookie.get('NavDrawerPersistent') === 'true';

        if (isNavDrawerPersistent) {
            this.menuOpen = true;
        }
    }
}
