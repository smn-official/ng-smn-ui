import {Component, AfterViewInit, ElementRef, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ui-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiSwitchComponent implements AfterViewInit {

    constructor(private element: ElementRef) {
    }

    ngAfterViewInit() {
        const input = this.element.nativeElement.querySelectorAll('input')[0];

        input.classList.add('ui-switch');

        const switchShell = '<div class="switch-cover"><div class="track"></div><div class="thumb-container"><div class="thumb"></div></div></div>';

        input.insertAdjacentHTML('afterend', switchShell);
    }

}
