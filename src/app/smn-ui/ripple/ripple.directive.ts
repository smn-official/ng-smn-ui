import {Directive, ElementRef} from '@angular/core';

import {UiElement} from '../providers/element.provider';
import {UiWindowRef} from '../providers/window.provider';

@Directive({
    selector: '[uiRipple]'
})
export class UiRippleDirective {
    constructor(private element: ElementRef) {
        console.log(element.nativeElement);

        const elRippleContainerTemplate = <HTMLElement>document.createElement('div');
        elRippleContainerTemplate.classList.add('ui-ripple-container');
        const elRippleTemplate = <HTMLElement>document.createElement('div');
        elRippleTemplate.classList.add('ui-ripple-wave');

        const elRippleContainerTemplateClone = <HTMLElement>elRippleContainerTemplate.cloneNode(true);

        let ripples = 0;

        element.nativeElement.addEventListener('mousedown', (e) => {
            const elementWidth = element.nativeElement.offsetWidth;
            const elementHeight = element.nativeElement.offsetHeight;

            elRippleContainerTemplateClone.style.borderRadius = element.nativeElement.style.borderRadius;
            elRippleContainerTemplateClone.style.width = elementWidth + 'px';
            elRippleContainerTemplateClone.style.height = elementHeight + 'px';

            element.nativeElement.appendChild(elRippleContainerTemplateClone);

            const elRippleTemplateClone = <HTMLElement>elRippleTemplate.cloneNode(true);

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
            const elementPos = UiElement.position(element.nativeElement);

            const pos = {
                y: mousePos.y - elementPos.top,
                x: mousePos.x - elementPos.left
            };

            const borderRadius = element.nativeElement.style.borderRadius || 0;
            if (borderRadius === elementWidth / 2) {
                finalTop = finalTop + (elementWidth / 2);
                finalLeft = finalLeft + (elementWidth / 2);
            } else {
                finalTop = finalTop + pos.y;
                finalLeft = finalLeft + pos.x;
            }

            elRippleTemplateClone.style.top = finalTop + 'px';
            elRippleTemplateClone.style.left = finalLeft + 'px';

            elRippleContainerTemplateClone.insertBefore(elRippleTemplateClone, elRippleContainerTemplateClone.firstChild);

            elRippleContainerTemplateClone.classList.add('pressed');

            animate(elRippleContainerTemplateClone, 'border-spacing', 0, 1, 800, null, (tick) => {
                elRippleTemplateClone.style.transform = `scale(${tick})`;
            });

            ripples++;
        });

        element.nativeElement.addEventListener('mouseup', () => {
            elRippleContainerTemplateClone.classList.remove('pressed');

            const elRipples = elRippleContainerTemplateClone.children;
            console.log(elRipples);

            const len = elRipples.length;
            for (let i = 0; i < len; i++) {
                const elRipple = <HTMLElement>elRipples[i];
                if (elRipple) {
                    const elementOpacity = elRipple.style.opacity || '1';
                    console.log(elementOpacity);

                    if (elementOpacity === '1') {
                        animate(elRipple, 'opacity', 1, 0, 800, () => {
                            try {
                                elRipple.parentNode.removeChild(elRipple);
                            } catch (e) {
                            }
                            ripples = 0;
                        }, null);
                    }
                }
            }
        });
    }
}

UiWindowRef.nativeWindow.addEventListener('mouseup', eraseRipples);

function eraseRipples() {
    setTimeout(() => {
        /*Retirando todos os ripples que ficaram para trás*/
        const elRipples = document.querySelectorAll('.ui-ripple-wave');

        const len = elRipples.length;
        for (let i = 0; i < len; i++) {
            const elRipple = <HTMLElement>elRipples[i];
            if (elRipple) {
                const elRippleParent = <HTMLElement>elRipple.parentNode;

                const elRipples2 = elRippleParent.children;
                const len2 = elRipples2.length;
                for (let i2 = 0; i2 < len2; i2++) {
                    const elRipple2 = <HTMLElement>elRipples2[i];
                    if (elRipple2) {
                        const elementOpacity = elRipple2.style.opacity || '1';

                        if (elementOpacity === '1') {
                            animate(elRipple2, 'opacity', 1, 0, 800, () => {
                                try {
                                    elRipple2.parentNode.removeChild(elRipple2);
                                } catch (e) {
                                }
                                eraseRipples();
                            }, null);
                        }
                    }
                }
            }
        }

    });
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

function animate(object, property, start_value, end_value, time, end, tick) {
    const propWithPx = ['width', 'height', 'left', 'top', 'border-radius', 'border-spacing', 'margin-left', 'margin-top'];

    const frame_rate = 0.06; // 60 FPS
    let frame = 0;
    const delta = (end_value - start_value) / time / frame_rate;
    const handle = setInterval(() => {
        frame++;
        const value = start_value + delta * frame;

        if (tick) {
            tick(value);
        }

        const hasPx = propWithPx.indexOf(property) > -1;

        object.style[property] = value + (hasPx ? 'px' : '');
        if ((start_value > end_value ? value.toFixed(2) <= end_value : value.toFixed(2) >= end_value)) {
            clearInterval(handle);

            if (end) {
                end();
            }
        }
    }, 1 / frame_rate);
}
