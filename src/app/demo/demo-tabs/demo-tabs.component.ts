import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-tabs',
    templateUrl: './demo-tabs.component.html',
    styleUrls: ['./demo-tabs.component.scss']
})
export class DemoTabsComponent implements OnInit {
    loading: boolean;

    constructor() {
        this.loading = true;
    }

    ngOnInit() {
        // setTimeout(() => this.loading = true, 2000);
        setTimeout(() => this.loading = false, 4000);
    }

    clickOnTemplate() {
        console.log('clicked');
    }
}
