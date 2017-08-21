import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {palette} from './color-picker.palette';
import {UiElement} from '../utils/providers/element.provider';

@Directive({
    selector: '[uiColorPicker]'
})
export class UiColorPickerDirective implements AfterViewInit {

    @Input() ngModel;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    elementColor;
    palette;

    constructor(public element: ElementRef) {
        this.palette = palette;
    }

    ngAfterViewInit() {
        this.generateElementColor();
        this.setColorElement(this.ngModel);

        this.element.nativeElement.classList.add('elevate');
        this.element.nativeElement.parentNode.appendChild(this.elementColor);

        this.addEvents();
    }

    generateElementColor() {
        this.elementColor = document.createElement('div');
        this.elementColor.classList.add('ui-color');
        this.elementColor.setAttribute('tabindex', '1');
    }

    setColorElement(color) {
        if (!color) {
            const icon = document.createElement('i');
            icon.classList.add('material-icons', 'secondary-text');
            icon.innerText = 'block';
            this.elementColor.appendChild(icon);
            return;
        }

        this.elementColor.setAttribute('style', `background-color: ${color}`);
    }

    addEvents() {
        UiElement.on(this.elementColor, 'click', () => {
            console.log('generate colorpicker');
        });
    }
}
