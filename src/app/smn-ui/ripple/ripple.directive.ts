import {Directive, ElementRef, HostListener} from '@angular/core';

import {UiElement} from '../utils/providers/element.provider';

@Directive({
    selector: '[uiRipple]'
})
export class UiRippleDirective {
    private elRippleContainerTemplate: HTMLElement;
    private elRippleTemplate: HTMLElement;
    private elRippleContainerTemplateClone: HTMLElement;
    private ripples: number;
    private maxRipples = 20;

    constructor(private element: ElementRef) {
        this.elRippleContainerTemplate = document.createElement('div');
        this.elRippleContainerTemplate.classList.add('ui-ripple-container');
        this.elRippleTemplate = document.createElement('div');
        this.elRippleTemplate.classList.add('ui-ripple-wave');

        this.elRippleContainerTemplateClone = <HTMLElement>this.elRippleContainerTemplate.cloneNode(true);

        this.ripples = 0;
    }

    @HostListener('mousedown', ['$event']) onMousedown(e) {
        if (!this.element.nativeElement.hasAttribute('disabled') && this.ripples < this.maxRipples) {
            const elementWidth = this.element.nativeElement.offsetWidth;
            const elementHeight = this.element.nativeElement.offsetHeight;

            const isIcon = this.element.nativeElement.classList.contains('icon');
            const isFab = this.element.nativeElement.classList.contains('fab');
            const isRounded = this.element.nativeElement.classList.contains('ripple-rounded');

            if (isIcon || isFab || isRounded) {
                this.elRippleContainerTemplateClone.style.borderRadius = '50%';
            }
            this.elRippleContainerTemplateClone.style.width = elementWidth + 'px';
            this.elRippleContainerTemplateClone.style.height = elementHeight + 'px';

            this.element.nativeElement.appendChild(this.elRippleContainerTemplateClone);

            const elRippleTemplateClone = <HTMLElement>this.elRippleTemplate.cloneNode(true);

            const isElementHorizontal = elementWidth > elementHeight;

            let finalWidth;
            let finalHeight;
            let finalTop;
            let finalLeft;

            if (isElementHorizontal) {
                finalWidth = elementWidth * 3;
                finalHeight = elementWidth * 3;
            } else {
                finalWidth = elementHeight * 3;
                finalHeight = elementHeight * 3;
            }

            finalTop = -(finalWidth / 2);
            finalLeft = -(finalWidth / 2);

            elRippleTemplateClone.style.width = finalWidth + 'px';
            elRippleTemplateClone.style.height = finalHeight + 'px';

            const mousePos = getMousePosition(e);
            const elementPos = UiElement.position(this.element.nativeElement);

            const pos = {
                y: mousePos.y - elementPos.top,
                x: mousePos.x - elementPos.left
            };

            if (isIcon || isFab || isRounded) {
                finalTop = finalTop + (elementWidth / 2);
                finalLeft = finalLeft + (elementWidth / 2);
            } else {
                finalTop = finalTop + pos.y;
                finalLeft = finalLeft + pos.x;
            }

            elRippleTemplateClone.style.top = finalTop + 'px';
            elRippleTemplateClone.style.left = finalLeft + 'px';

            this.elRippleContainerTemplateClone.insertBefore(elRippleTemplateClone, this.elRippleContainerTemplateClone.firstChild);

            this.elRippleContainerTemplateClone.classList.add('pressed');

            UiElement.animate(this.elRippleContainerTemplateClone, 'border-spacing', 0, 1, 800, null, (tick) => {
                elRippleTemplateClone.style.transform = `scale(${tick})`;
            });

            this.ripples++;
        }
    }

    @HostListener('mouseup', ['$event']) onMouseup(e) {
        eraseRipples(this);
    }

    @HostListener('mouseout', ['$event']) onMouseout(e) {
        eraseRipples(this);
    }
}

function eraseRipples(thiss) {
    thiss.elRippleContainerTemplateClone.classList.remove('pressed');

    const elRipples = thiss.elRippleContainerTemplateClone.children;

    const len = elRipples.length;

    thiss.ripples = len;

    for (let i = 0; i < len; i++) {
        const elRipple = <HTMLElement>elRipples[i];
        if (elRipple) {
            const elementOpacity = elRipple.style.opacity || '1';

            if (elementOpacity === '1') {
                UiElement.animate(elRipple, 'opacity', 1, 0, 800, () => {
                    try {
                        elRipple.parentNode.removeChild(elRipple);
                        thiss.ripples--;
                    } catch (e) {
                    }
                    if (!thiss.ripples) {
                        try {
                            thiss.elRippleContainerTemplateClone.parentNode.removeChild(thiss.elRippleContainerTemplateClone);
                        } catch (e) {
                        }
                    }
                }, null);
            }
        }
    }
}

function getMousePosition(e) {
    const pos = {
        y: undefined,
        x: undefined
    };

    if (e.originalEvent && e.originalEvent.touches !== undefined) {
        pos.y = e.originalEvent.touches[0].pageY;
        pos.x = e.originalEvent.touches[0].pageX;
    } else if (e.pageX) {
        pos.y = e.pageY;
        pos.x = e.pageX;
    } else if (e && e.touches !== undefined) {
        pos.y = e.touches[0].pageY;
        pos.x = e.touches[0].pageX;
    }

    return pos;
}
