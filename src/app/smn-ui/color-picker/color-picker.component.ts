import {Component, OnInit} from '@angular/core';
import {colorNames, colors} from './color-picker.palette';

@Component({
    selector: 'ui-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss']
})
export class UiColorPickerComponent implements OnInit {

    colors: string[];
    colorNames: any;

    constructor() {
        this.colors = colors;
        this.colorNames = colorNames;
    }

    ngOnInit() {
    }

}
