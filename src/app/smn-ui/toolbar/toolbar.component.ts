import {Component, AfterViewInit, ViewEncapsulation, ElementRef} from '@angular/core';
import {WindowRef} from '../providers/window.provider';

@Component({
    selector: 'ui-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiToolbarComponent implements AfterViewInit {

    constructor(private winRef: WindowRef, private element: ElementRef) {
        winRef.nativeWindow.addEventListener('scroll', () => {
            this.element.nativeElement.classList.remove('scrolled');
            if (this.element.nativeElement.classList.contains('elevate-on-scroll') && winRef.nativeWindow.scrollY > 1) {
                /*console.log(this.element.nativeElement);*/
                this.element.nativeElement.classList.add('scrolled');
            }
        });
    }

    ngAfterViewInit() {
    }

}
