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
        const toolbarElevateOnScroll = () => {
            this.element.nativeElement.classList.remove('scrolled');
            if (this.element.nativeElement.classList.contains('elevate-on-scroll') && winRef.nativeWindow.scrollY > 1) {
                this.element.nativeElement.classList.add('scrolled');
            }
        };

        winRef.nativeWindow.addEventListener('scroll', toolbarElevateOnScroll);
        winRef.nativeWindow.addEventListener('resize', toolbarElevateOnScroll);
    }

    ngAfterViewInit() {
    }

}
