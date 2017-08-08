import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UiToolbarService} from '../../smn-ui/toolbar/toolbar.service';

@Component({
  selector: 'ui-demo-file',
  templateUrl: './demo-file.component.html',
  styleUrls: ['./demo-file.component.scss']
})
export class DemoFileComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Files - SMN UI Demos');
        this.toolbarService.set('Files');
    }

    changeFile(listFile: FileList) {
        console.log(listFile);
    }

}
