import {Component, ElementRef, HostListener, Inject, Input, OnInit} from '@angular/core';
import {UiSelectComponent} from '../select.component';
import {UiElement} from '../../utils/providers/element.provider';

@Component({
    selector: 'ui-select-option',
    templateUrl: 'option.component.html',
    styleUrls: ['./option.component.scss']
})

export class UiSelectOptionComponent implements OnInit {
    @Input() value;
    @Input() label;
    @Input() internal;

    constructor(@Inject(UiSelectComponent) private selectComponent: UiSelectComponent, private element: ElementRef) {
    }

    ngOnInit() {
        this.element.nativeElement.setAttribute('tabindex', 0);
        if (!this.internal) {
            this.selectComponent.optionsExternal.push({
                value: this.value,
                title: this.label
            });
        }
    }

    @HostListener('click')
    onClick() {
        this.selectComponent.ngModelChange.next(this.value);
        this.selectComponent.model = this.value;
        this.selectComponent.selected = this.label;
        this.element.nativeElement.blur();
    }

    @HostListener('keydown', ['$event'])
    onEnter(e) {
        if (e.keyCode === 13) {
            this.element.nativeElement.click();
        }
    }

    @HostListener('blur', ['$event'])
    onBlur(event) {
        if (!event.relatedTarget || !(UiElement.is(event.relatedTarget, 'ui-select-option') || UiElement.is(event.relatedTarget, '.selected') || UiElement.is(event.relatedTarget, '.input-select'))) {
            this.selectComponent.close();
        }
    }
}
