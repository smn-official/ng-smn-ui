import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'ui-demo-tabs',
    templateUrl: './demo-tabs.component.html',
    styleUrls: ['./demo-tabs.component.scss']
})
export class DemoTabsComponent implements OnInit {
    loading: boolean;
    info: any;
    @ViewChild('primaryForm', { static: false }) primaryForm;
    @ViewChild('phoneForm', { static: false }) phoneForm;

    constructor() {
        this.info = {};
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
