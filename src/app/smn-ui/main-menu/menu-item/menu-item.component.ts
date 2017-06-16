import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {UiMainMenuComponent} from './../main-menu.component';


@Component({
    selector: 'ui-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UiMenuItemComponent {
    @Input() item: any;
    @Input() list: any;
    @Input() level: any;
    @Output() isOpen = new EventEmitter();

    isOpened = false;

    constructor(private router: Router, private mainMenu: UiMainMenuComponent) {
    }

    openMenu(event: any) {
        this.isOpened = !this.isOpened;
        this.isOpen.emit({menuOpened: this.isOpened});
    }

    openLink() {
        this.router.navigate(['/', this.item.url]);
    }
}
