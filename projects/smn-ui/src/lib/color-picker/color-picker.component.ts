import {Component, EventEmitter, AfterViewInit, Output, ViewChild, Input} from '@angular/core';
import {palette, colors} from './color-picker.palette';
import {NgControl} from "@angular/forms";

@Component({
    selector: 'ui-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss']
})
export class UiColorPickerComponent implements AfterViewInit {

    palette: any;
    colors: any;
    hues: any;
    colorSelected: any;
    ngModel: any;
    value: any;
    ngModelChange: EventEmitter<any>;
    @Output() valueChange: EventEmitter<any> = new EventEmitter();
    @ViewChild('hueColor') hueColor: any;

    constructor(private ngControl: NgControl) {
        this.palette = palette;
        this.colors = colors;
        this.hues = Array.from({length: 10}, (ngModel, index) => index * 100);
        this.hues[0] = 50;
        this.value = 500;
        this.colorSelected = {};
    }

    ngAfterViewInit() {
        this.setColorSelected(this.ngModel);
        this.hueColor.valueChange.subscribe(hue => {
            this.ngModel = this.getColor(this.colorSelected.name, hue);
            this.ngModelChange.emit(this.ngModel);
        });
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
        this.ngControl.control.markAsDirty();
        this.deselectColors();
        colorSelected.selected = true;
        this.colorSelected = colorSelected;
        this.ngModel = this.getColor(this.colorSelected.name, this.value);
        this.ngModelChange.emit(this.ngModel);
    }

    deselectColors() {
        this.ngControl.control.markAsDirty();
        this.ngModel = this.getColor(null);
        this.ngModelChange.emit(this.ngModel);
        this.colorSelected = {};
        this.value = 500;
        this.colors.forEach(color => color.selected = false);
    }

    setColorSelected(color) {
        if (!color) {
            return;
        }

        Object.keys(this.palette).forEach(key => {
            Object.keys(this.palette[key]).forEach(hue => {
                if (this.palette[key][hue].color === color) {
                    this.colors.forEach(item => {
                        if (item.name === key) {
                            setTimeout(() => {
                                item.selected = true;
                                this.value = hue;
                                this.colorSelected = item;
                            });
                        }
                    });
                }
            });
        });
    }
    }
