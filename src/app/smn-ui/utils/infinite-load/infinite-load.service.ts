import {Injectable} from '@angular/core';

@Injectable()
export class UiInfiniteLoadService {
    readyToCheck: boolean;
    func: any;
    element: any;
    listener: any;

    constructor() {
    }

    register(element, func) {
        this.element = element;
        this.func = func;

        this.listener = () => {
            const heightOffset = (this.element.scrollHeight || document.documentElement.scrollHeight) - (this.element.clientHeight || this.element.innerHeight);
            const scrollTop = this.element.scrollTop || this.element.scrollY;
            const safeZone = heightOffset * 0.1;

            if (scrollTop >= heightOffset - safeZone) {
                func();
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

