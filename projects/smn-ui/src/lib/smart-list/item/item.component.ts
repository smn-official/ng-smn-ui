import {Component, ElementRef, Inject, AfterViewInit} from '@angular/core';
import {UiSmartListComponent} from '../smart-list.component';
import {UiElementRef} from '../../utils/providers/element-ref.provider';

@Component({
    selector: 'ui-smart-list-item',
    templateUrl: '../smart-list.component.html'
})

export class UiSmartListItemComponent implements AfterViewInit {
    constructor(@Inject(UiSmartListComponent) private parent: UiSmartListComponent, private element: ElementRef) {
    }

    ngAfterViewInit() {
        const self = this;

        this.element.nativeElement.querySelectorAll('input').forEach(el => {
            el.addEventListener('focus', e => {
                this.onFocus(e, self);
            });

            el.addEventListener('blur', e => {
                this.onBlur(e, self);
            });
        });
    }

    onFocus(event, self) {
        const el = event.target;

        const elItem = new UiElementRef(el).closest('ui-smart-list-item');
        const newIndex = Array.prototype.indexOf.call(self.parent.element.nativeElement.children, elItem.nativeElement);
        self.parent.currentFocusedElementIndex = newIndex > -1 ? newIndex : self.parent.currentFocusedElementIndex;
    }

    onBlur(event, self) {
        setTimeout(() => {
            const target = new UiElementRef(event.target);
            if (!target.closest('body').nativeElement) {
                setTimeout(() => {
                    self.parent.element.nativeElement.children[self.parent.currentFocusedElementIndex].querySelector('input').focus();
                }, 100);
            }
        });
    }
}
