import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UiElement} from '../utils/providers/element.provider';

@Component({
    selector: 'ui-slider[value]',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class UiSliderComponent implements OnInit, AfterViewInit, OnChanges {
    multiHandle: boolean;
    valueModel;
    mouseDown: boolean;
    percentageBlock: number;
    valueElement: HTMLElement;
    getPercentageLeft: Function;
    getPercentageRight: Function;

    @Input() hideBalloon: boolean;
    @Input() disabled: boolean;
    @Input() value: number;
    @Input() range: number[];
    @Input() color: string;
    @Input('text-color') textColor: string;
    @Output() valueChange: EventEmitter<number> = new EventEmitter();

    @Input('view-format') viewFormat: Function;

    constructor(public elementRef: ElementRef) {
        if (!this.viewFormat) {
            this.viewFormat = value => value;
        }
    }

    ngOnInit() {
        this.percentageBlock = 100 / (this.range.length - 1);
        this.value = this.value || this.range[0];
        this.valueModel = this.closestNumber(this.value).index || this.range[0];
    }

    ngOnChanges(changes) {
        if (changes.value && !changes.value.firstChange && !this.mouseDown) {
            this.valueModel = this.closestNumber(changes.value.currentValue).index;
        }
        if (changes.color && !changes.color.firstChange && !this.mouseDown) {
            this.color = changes.color.currentValue;
        }
        if (changes.textColor && !changes.textColor.firstChange && !this.mouseDown) {
            this.textColor = changes.textColor.currentValue;
        }
    }

    ngAfterViewInit() {
        this.valueElement = this.elementRef.nativeElement.querySelectorAll('.thumb-container')[0];
        this.registerEventsListeners();
    }

    registerEventsListeners() {
        UiElement.on(this.valueElement, 'mousedown touchstart', () => {
            if (this.disabled) {
                return;
            }

            this.mouseDown = true;
            this.toggleTackOn(true);
            this.toggleBalloon(true, 0);

            this.valueElement.classList.add('active');
        });

        UiElement.on(document, 'mouseup touchend', e => {
            if (this.disabled) {
                return;
            }

            this.valueElement.classList.remove('active');

            if (this.mouseDown && (e.pageX || e.originalEvent)) {
                this.change(e, true);
            }

            this.mouseDown = false;
            this.toggleBalloon();
            this.toggleTackOn();
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

        this.value = newValue.value;
        this.valueModel = position;
        this.valueChange.emit(this.value);

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

    getPercentage() {
        return this.percentageBlock * this.valueModel;
    }

}
