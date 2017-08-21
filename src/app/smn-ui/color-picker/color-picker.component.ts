import {Component, OnInit} from '@angular/core';
import {palette, colors} from './color-picker.palette';

@Component({
    selector: 'ui-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss']
})
export class UiColorPickerComponent implements OnInit {

    palette: any;
    colors: any;
    hues: any;
    colorSelected: any;
    value: any;

    constructor() {
        this.palette = palette;
        this.colors = colors;
        this.hues = Array.from({length: 10}, (value, index) => index * 100);
        this.hues[0] = 50;
        this.value = 500;
        this.colorSelected = {};
    }

    ngOnInit() {
    }

    getColor(color, hue = 500) {
        if (!color) {
            return;
        }
        return this.palette[color][hue].color;
    }

    getColorText(color, hue = 500) {
        if (!color) {
            return;
        }
        return this.palette[color][hue].text;
    }

    selectColor(colorSelected) {
        this.deselectColors();
        colorSelected.selected = true;
        this.colorSelected = colorSelected;
    }

    deselectColors() {
        this.colorSelected = {};
        this.value = 500;
        this.colors.forEach(color => color.selected = false);
    }

    getNameColorInPalette(color) {
        if (!color) {
            return;
        }
        Object.keys(this.palette).forEach(key => {
            Object.keys(this.palette[key]).forEach(hue => {
                if (this.palette[key][hue].color === color) {
                    console.log('Found');
                }
            });
        });
    }
}
