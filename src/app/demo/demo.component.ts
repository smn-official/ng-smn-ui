import {Component, ViewEncapsulation, OnInit, AfterViewInit, ElementRef} from '@angular/core';

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

    constructor(private toolbarService: UiToolbarService, public element: ElementRef) {
        toolbarService.change.subscribe(title => {
            this.title = title;
        });
    }

    ngOnInit() {
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
