import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UiElement} from '../utils/providers/element.provider';

@Component({
    selector: 'ui-slider[begin][end]',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class UiSliderMultiHandleComponent implements OnInit, AfterViewInit, OnChanges {

    multiHandle: boolean;
    beginModel;
    endModel;
    direction: string;
    mouseDown: boolean;
    percentageBlock: number;
    beginElement: HTMLElement;
    endElement: HTMLElement;
    thumbs: HTMLElement;
    bodyElement: HTMLElement;
    htmlElement: HTMLElement;
    getPercentage: Function;

    @Input() hideBalloon: boolean;
    @Input() disabled: boolean;
    @Input() begin: number;
    @Input() end: number;
    @Input() range: number[];
    @Input() color: string;
    @Input('text-color') textColor: string;
    @Output() beginChange: EventEmitter<number> = new EventEmitter();
    @Output() endChange: EventEmitter<number> = new EventEmitter();

    @Input('view-format') viewFormat: Function;

    constructor(public elementRef: ElementRef) {
        if (!this.viewFormat) {
            this.viewFormat = value => value;
        }
    }

    ngOnInit() {
        this.bodyElement = document.body;
        this.htmlElement = <HTMLElement>document.documentElement;

        this.multiHandle = true;
        this.percentageBlock = 100 / (this.range.length - 1);
        this.begin = this.begin || this.range[0];
        this.end = this.end || this.range[0];
        this.beginModel = this.closestNumber(this.begin).index || this.range[0];
        this.endModel = this.closestNumber(this.end).index || this.range[0];
    }

    ngOnChanges(changes) {
        if (changes.begin && !changes.begin.firstChange && !this.mouseDown) {
            this.beginModel = this.closestNumber(this.begin).index;
        }
        if (changes.end && !changes.end.firstChange && !this.mouseDown) {
            this.endModel = this.closestNumber(this.end).index;
        }
        if (changes.color && !changes.color.firstChange && !this.mouseDown) {
            this.color = changes.color.currentValue;
        }
        if (changes.textColor && !changes.textColor.firstChange && !this.mouseDown) {
            this.textColor = changes.textColor.currentValue;
        }
    }

    ngAfterViewInit() {
        this.thumbs = this.elementRef.nativeElement.querySelectorAll('.thumb-container');
        this.beginElement = this.thumbs[0];
        this.endElement = this.thumbs[1];

        this.registerEventsListeners();
    }

    registerEventsListeners() {
        UiElement.on(this.beginElement, 'mousedown touchstart', e => {
            if (this.disabled) {
                return;
            }
            e.stopImmediatePropagation();
            this.direction = 'begin';
            this.toggleBalloon(true);

            this.beginElement.classList.add('active');
            this.endElement.classList.remove('active');
        });

        UiElement.on(this.thumbs, 'mousedown touchstart', e => {
            if (this.disabled) {
                return;
            }
            e.stopImmediatePropagation();
            this.mouseDown = true;
            this.toggleTackOn(true);
            UiElement.disableScroll();
        });

        UiElement.on(this.endElement, 'mousedown touchstart', e => {
            if (this.disabled) {
                return;
            }
            e.stopImmediatePropagation();
            this.direction = 'end';
            this.toggleBalloon(true, 0);

            this.endElement.classList.add('active');
            this.beginElement.classList.remove('active');
        });

        UiElement.on(document, 'mouseup touchend', e => {
            if (this.disabled) {
                return;
            }

            this.beginElement.classList.remove('active');
            this.endElement.classList.remove('active');

            if (this.mouseDown && (e.pageX || e.originalEvent)) {
                this.change(e, true);
            }

            this.mouseDown = false;
            this.toggleBalloon();
            this.toggleTackOn();

            UiElement.enableScroll();

        });

        UiElement.on(document, 'mousemove touchmove', e => {
            if (!this.mouseDown || this.disabled) {
                return;
            }
            this.change(e);
        });
    }

    change(event, mouseUp?) {
        const currentPosition = event.pageX || (event.touches ? event.touches[0].pageX : null) || (event.changedTouches ? event.changedTouches[0].pageX : null);
        let position = this.getPositionInIndex(currentPosition);
        const newValue = this.closestNumber(this.range[Math.round(position)]);

        if (mouseUp) {
            position = newValue.index;
        }

        if (this.direction === 'begin' && this.beginModel >= this.endModel) {
            this[`${this.direction}Model`] = newValue.index;
            this.direction = 'end';
            UiElement.trigger(this.endElement, 'mousedown');
            this.endElement.focus();
        } else if (this.direction === 'end' && this.endModel < this.beginModel) {
            this[`${this.direction}Model`] = newValue.index;
            this.direction = 'begin';
            UiElement.trigger(this.beginElement, 'mousedown');
            this.beginElement.focus();
        }

        this[this.direction] = newValue.value;
        this[`${this.direction}Model`] = position;
        this[`${this.direction}Change`].emit(this[this.direction]);

    }

    toggleBalloon(active?, right?) {
        const balloon = this.elementRef.nativeElement.querySelectorAll('.balloon-wrap')[0];

        if (balloon) {
            if (active) {
                balloon.style.right = typeof right === 'number' ? right : '';
                balloon.classList.add('active');
            } else {
                balloon.classList.remove('active');
            }
        }
    }

    toggleTackOn(active?) {
        const trackOn = this.elementRef.nativeElement.querySelectorAll('.track.on')[0];
        const method = active ? 'add' : 'remove';
        trackOn.classList[method]('no-transition');
    }

    getPositionInIndex(position) {
        const trackOff = this.elementRef.nativeElement.querySelectorAll('.track.off')[0];
        position -= UiElement.position(trackOff).left;
        position = position / trackOff.clientWidth * 100;
        position = position > 100 ? 100 : position < 0 ? 0 : position;
        return ((this.range.length - 1) / 100) * position;
    }

    closestNumber(number) {
        let current = this.range[0];
        let difference = Math.abs(number - current);
        let itemIndex = 0;
        let newDifference;
        for (let i = 0; i < this.range.length; i++) {
            newDifference = Math.abs(number - this.range[i]);
            if (newDifference < difference) {
                difference = newDifference;
                current = this.range[i];
                itemIndex = i;
            }
        }

        return {index: itemIndex, value: current};
    }

    getPercentageLeft() {
        return this.percentageBlock * this.beginModel;
    }

    getPercentageRight() {
        return this.percentageBlock * Math.abs(this.endModel - (this.range.length - 1));
    }
}
