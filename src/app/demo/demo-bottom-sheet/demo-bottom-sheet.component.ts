import {Component, OnInit, ViewChild} from '@angular/core';
import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/toolbar/toolbar.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'ui-demo-bottom-sheet',
    templateUrl: './demo-bottom-sheet.component.html',
    styleUrls: ['./demo-bottom-sheet.component.scss']
})
export class DemoBottomSheetComponent implements OnInit {
    @ViewChild('listBottomSheet') listBottomSheet: any;

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Bottom sheets - SMN UI Demos');
        this.toolbarService.set('Bottom sheets');
    }

    openBottomSheet() {
        this.listBottomSheet.show({
            cardSize: 600
        });
    }

}
