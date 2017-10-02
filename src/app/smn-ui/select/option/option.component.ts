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

    constructor(@Inject(UiSelectComponent) private selectComponent: UiSelectComponent, private element: ElementRef) {
    }

    ngOnInit() {
        this.element.nativeElement.setAttribute('tabindex', 1);
        this.selectComponent.options.push({
            value: this.value,
            title: this.label
        });
    }

    @HostListener('click')
    onClick() {
        this.selectComponent.modelChange.next(this.value);
        this.selectComponent.selected = this.label;
        this.element.nativeElement.blur();
    }

    @HostListener('blur', ['$event'])
    onBlur(event) {
        if (!event.relatedTarget || !UiElement.is(event.relatedTarget, 'ui-select-option')) {
            this.selectComponent.close();
        }
    }
}
