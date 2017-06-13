import {Component, AfterViewInit, ElementRef, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ui-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiOptionComponent implements AfterViewInit {

    constructor(private element: ElementRef) {
    }

    ngAfterViewInit() {
        const input = this.element.nativeElement.querySelectorAll('input')[0];

        input.classList.add('ui-option');

        const optionShell = '<div class="ui-option-shell"><div class="ui-option-fill"></div><div class="ui-option-mark"></div></div>';

        input.insertAdjacentHTML('afterend', optionShell);
    }

}
