import {AfterViewInit, Directive, ElementRef, HostListener, Input} from '@angular/core';

import {UiElement} from '../utils/providers/element.provider';

@Directive({selector: '[uiListItem]'})
export class UiListItemDirective implements AfterViewInit {
    @Input() uiListItem;

    constructor(private element: ElementRef) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const itemActive = this.uiListItem.querySelectorAll('.ui-list-item.active')[0];
            if (itemActive) {
                this.element.nativeElement.classList.toggle('expanded');
                this.uiListItem.classList.toggle('expanded');
                toggleExpand(this.uiListItem, this.element.nativeElement);
            }
        });
    }

    @HostListener('click')
    onClick() {
        this.element.nativeElement.classList.toggle('expanded');
        this.uiListItem.classList.toggle('expanded');
        toggleExpand(this.uiListItem, this.element.nativeElement);
    }
}

function toggleExpand(elementList, elementTrigger) {
    if (!elementList.style.height || elementList.style.height === '0px') {
        const height = getHeight(elementList);
        elementList.style.height = (elementList.style.maxHeight ? (height > elementList.style.maxHeight.replace('px', '') ? elementList.style.maxHeight : height + 'px') : height + 'px');
        let listItemGroup = UiElement.closest(elementList, '.ui-list-item-group');
        while (listItemGroup) {
            listItemGroup.style.height = getHeight(listItemGroup) + height + 'px';
            if (listItemGroup) {
                listItemGroup = UiElement.closest(listItemGroup, '.ui-list-item-group');
            }
        }
    } else {
        const backupHeight = parseInt(elementList.style.height.replace('px', ''), 10);
        elementList.style.height = '';

        let listItemGroup = UiElement.closest(elementList, '.ui-list-item-group');
        while (listItemGroup) {
            listItemGroup.style.height = getHeight(listItemGroup) - backupHeight + 'px';
            if (listItemGroup) {
                listItemGroup = UiElement.closest(listItemGroup, '.ui-list-item-group');
            }
        }
    }

    setTimeout(() => {
        const list = UiElement.closest(elementList, '.ui-list');
        if (list) {
            let overflow = list.parentNode;
            if (UiElement.is(overflow, 'ui-list')) {
                overflow = overflow.parentNode;
            }
            UiElement.animate(elementList, 'border-spacing', overflow.scrollTop, elementTrigger.offsetTop, 500, null, (tick) => {
                overflow.scrollTop = tick;
            });
        }
    }, 500);
}

function getHeight(element) {
    return Array.prototype.reduce.call(element.childNodes, (p, c) => p + (c.offsetHeight || 0), 0);
}
