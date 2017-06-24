import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class UiSnackbarService {
    timeout: any;
    bars: any[] = [];
    barsChange: EventEmitter<any> = new EventEmitter();
    defaults: {} = {
        delay: 5000,
        center: false,
        actionText: null
    };

    constructor() {
        console.log(this.bars);
    }

    public add(bar) {
        bar = Object.assign({}, this.defaults, bar);
        this.bars.push(bar);
        if (this.bars.length === 1) {
            this.timerBar(bar);
        }
        this.barsChange.emit(this.bars);
    }

    public hide() {
        clearTimeout(this.timeout);
        this.finishTimeout();
    }

    private timerBar(bar) {
        if (this.bars.length) {
            this.timeout = setTimeout(() => this.finishTimeout(), bar.delay);
        }
    };

    private finishTimeout() {
        this.bars.shift();
        if (this.bars.length) {
            this.timerBar(this.bars[0]);
        }
        this.barsChange.emit(this.bars);
    }
}
