import {Component, AfterViewInit, ElementRef, ViewEncapsulation, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'ui-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiOptionComponent implements AfterViewInit, OnChanges {
    @Input() color: string;

    constructor(private element: ElementRef) {
    }

    ngAfterViewInit() {
        const input = this.element.nativeElement.querySelector('input');

        input.classList.add('ui-option');

        const optionShell = '<div class="ui-option-shell"><div class="ui-option-fill"></div><div class="ui-option-mark"></div></div>';

        input.insertAdjacentHTML('afterend', optionShell);
        this.setColor();
    }

    ngOnChanges(changes) {
        if (changes.color && !changes.color.firstChange) {
            this.setColor();
        }
    }

    setColor() {
        const optionFill = this.element.nativeElement.querySelector('.ui-option-fill');
        optionFill.style.borderColor = this.color || '';
    }

}
