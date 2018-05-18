import {Component, Inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';
import {DemoComponent} from '../demo.component';

@Component({
    selector: 'demo-nav-drawer',
    templateUrl: './demo-nav-drawer.component.html',
    styleUrls: ['./demo-nav-drawer.component.scss']
})
export class DemoNavDrawerComponent implements OnInit {

    constructor(private titleService: Title,
                private toolbarService: UiToolbarService,
                @Inject(DemoComponent) private parent: DemoComponent) {
    }

    ngOnInit() {
        this.titleService.setTitle('Navigation Drawer - SMN UI Demos');
        this.toolbarService.set('Navigation Drawer');
    }

    openDrawer() {
        this.parent.menuOpen = true;
    }

    closeDrawer() {
        this.parent.menuOpen = false;
    }

    openDrawerNormal() {
        this.parent.element.nativeElement.querySelectorAll('ui-nav-drawer')[0].classList.remove('persistent');
        document.body.classList.remove('ui-nav-drawer-persistent');
        this.openDrawer();
    }

    openDrawerPersistent() {
        this.openDrawer();
        this.parent.element.nativeElement.querySelectorAll('ui-nav-drawer')[0].classList.add('persistent');
        document.body.classList.add('ui-nav-drawer-persistent');
    }
}
