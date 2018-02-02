import {Injectable} from '@angular/core';

@Injectable()
export class UiInfiniteLoadService {
    readyToCheck: boolean;
    func;
    element;
    listener;

    constructor() {
    }

    register(element, func, orientation = 'vertical') {
        this.element = element;
        this.func = func;

        this.listener = () => {
            if (orientation === 'vertical') {
                const heightOffset = (this.element.scrollHeight || document.documentElement.scrollHeight) - (this.element.clientHeight || this.element.innerHeight);
                const scrollTop = this.element.scrollTop || this.element.scrollY;
                const safeZone = heightOffset * 0.1;

                if (scrollTop >= heightOffset - safeZone) {
                    func();
                }
            } else {
                const widthOffset = (this.element.scrollWidth || document.documentElement.scrollWidth) - (this.element.clientWidth || this.element.innerWidth);
                const scrollLeft = this.element.scrollLeft || this.element.scrollX;
                const safeZone = widthOffset * 0.1;

                if (scrollLeft >= widthOffset - safeZone) {
                    func();
                }
            }
        };

        this.element.addEventListener('scroll', this.listener);
        this.readyToCheck = true;
    }

    destroy() {
        this.element.removeEventListener('scroll', this.listener);
        this.readyToCheck = false;
    }
}

