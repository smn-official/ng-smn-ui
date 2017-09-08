import {EventEmitter, Injectable} from '@angular/core';

let timeout: any;
const bars: any[] = [];
const defaults: {} = {
    duration: 5000,
    center: false,
    actionText: null
};

@Injectable()
export class UiSnackbar {
    static barsChange: EventEmitter<any> = new EventEmitter();

    static show(bar) {
        bar = Object.assign({}, defaults, bar);
        bars.push(bar);
        if (bars.length === 1) {
            this.timerBar(bar);
        }
        this.barsChange.emit(bars);
    }

    static hide() {
        if (bars.length) {
            document.querySelectorAll('ui-snackbar-container > ui-snackbar')[0].classList.add('leave');
            setTimeout(() => {
                clearTimeout(timeout);
                this.finishTimeout();
            }, 280);
        }
    }

    private static timerBar(bar) {
        if (bars.length) {
            this.elevateFAB();

            if (bar.duration !== Infinity) {
                timeout = setTimeout(() => {
                    const firstSnackbar = document.querySelectorAll('ui-snackbar-container > ui-snackbar')[0];
                    if (firstSnackbar) {
                        document.querySelectorAll('ui-snackbar-container > ui-snackbar')[0].classList.add('leave');
                    }
                    setTimeout(() => this.finishTimeout(), 280);
                }, bar.duration);
            }
        }
    };

    private static finishTimeout() {
        bars.shift();
        this.setTranslateFAB(0, false);
        if (bars.length) {
            this.timerBar(bars[0]);
        }
        this.barsChange.emit(bars);
    }

    private static elevateFAB() {
        setTimeout(() => {
            const snackHeight = document.querySelectorAll('ui-snackbar-container > ui-snackbar')[0].clientHeight;
            this.setTranslateFAB(snackHeight, true);
        });
    }

    private static setTranslateFAB(translate, addClass) {
        const fabs = document.querySelectorAll('.ui-fab-container.scrolled');
        [].forEach.call(fabs, (fab) => {
            fab.classList[addClass ? 'add' : 'remove']('elevating-snack');
            if (translate) {
                fab.style.transform = `translateY(-${translate}px)`;
            } else {
                fab.style.transform = ``;
            }
        });
    }

    constructor() {
    }
}
