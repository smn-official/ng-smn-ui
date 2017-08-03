import {OnDestroy, ChangeDetectorRef, Pipe, PipeTransform} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/repeatWhen';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeWhile';

@Pipe({
    name: 'uiTimeAgo',
    pure: false
})
export class UiTimeAgoPipe implements PipeTransform, OnDestroy {
    private async: AsyncPipe;
    private isDestroyed = false;
    private value: Date;
    private timer: Observable<string>;

    private textBefore: string;
    private textAfter: string;
    private isMinified: boolean;
    private isHence: boolean;

    constructor(ref: ChangeDetectorRef) {
        this.async = new AsyncPipe(ref);
    }

    public transform(obj: any, textBefore: string = '', textAfter: string = '', isMinified: boolean, isHence: boolean): any {
        this.textBefore = textBefore;
        this.textAfter = textAfter;
        this.isMinified = isMinified;
        this.isHence = isHence;

        if (obj == null) {
            return '';
        }

        if (!(obj instanceof Date)) {
            try {
                obj = new Date(obj);
            } catch (e) {
                throw new Error('UiTimeAgo só funciona com datas');
            }
        }

        this.value = obj;

        if (!this.timer) {
            this.timer = this.getObservable();
        }

        return this.async.transform(this.timer);
    }

    public now(): Date {
        return new Date();
    }

    public ngOnDestroy() {
        this.isDestroyed = true;
    }

    private getObservable() {
        return Observable
            .of(1)
            .repeatWhen(notifications => {
                return notifications.flatMap((x, i) => {
                    const sleep = i < 60 ? 1000 : 30000;
                    return Observable.timer(sleep);
                });
            })
            .takeWhile(_ => !this.isDestroyed)
            .map((x, i) => this.elapsed());
    };

    private elapsed(): string {
        const now = this.now().getTime();

        let delta = (now - this.value.getTime()) / 1000;

        if (this.isHence) {
            delta = delta * -1;
        }

        if (delta < 60) {
            const realDelta = Math.floor(delta);
            let timeAgo;
            if (this.isMinified) {
                timeAgo = `${realDelta}s`;
            } else {
                timeAgo = `${realDelta} segundo${(realDelta !== 1) ? 's' : ''}`;
            }
            return `${this.textBefore}${timeAgo}${this.textAfter}`;
        } else if (delta < 3600) {
            const realDelta = Math.floor(delta / 60);
            let timeAgo;
            if (this.isMinified) {
                timeAgo = `${realDelta}m`;
            } else {
                timeAgo = `${realDelta} minuto${(realDelta !== 1) ? 's' : ''}`;
            }
            return `${this.textBefore}${timeAgo}${this.textAfter}`;
        } else if (delta < 86400) {
            const realDelta = Math.floor(delta / 3600);
            let timeAgo;
            if (this.isMinified) {
                timeAgo = `${realDelta}h`;
            } else {
                timeAgo = `${realDelta} hora${(realDelta !== 1) ? 's' : ''}`;
            }
            return `${this.textBefore}${timeAgo}${this.textAfter}`;
        } else {
            const realDelta = Math.floor(delta / 86400);
            let timeAgo;
            if (this.isMinified) {
                timeAgo = `${realDelta}d`;
            } else {
                timeAgo = `${realDelta} dia${(realDelta !== 1) ? 's' : ''}`;
            }
            return `${this.textBefore}${timeAgo}${this.textAfter}`;
        }
    }
}
