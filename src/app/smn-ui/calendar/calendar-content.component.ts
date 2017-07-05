import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {UiDatetimeService} from './datetime.service';

import {UiElement} from '../utils/providers/element.provider';

@Component({
    selector: 'ui-calendar-content',
    templateUrl: './calendar-content.component.html',
    styleUrls: ['./calendar-content.component.scss'],
})
export class UiCalendarContentComponent implements AfterViewInit {
    maxDate: Date;
    minDate: Date;
    calendar: any;
    ngModel: any;
    chosenDate: any;
    days: any;
    months: any;
    confirmSelection: boolean;
    chosen: Subject<any> = new Subject();

    constructor(public datetimeService: UiDatetimeService, public elementRef: ElementRef) {
        this.days = datetimeService.days;
        this.months = datetimeService.months;
    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.querySelectorAll('.days button').forEach(item => {
            item.addEventListener('keydown', e => {
                const target = UiElement.closest(e.target, '.day');
                const index = UiElement.index(target);

                let toFocus;
                let toFocusIndex = 0;
                let toFocusAlt;

                setTimeout(() => {
                    switch (e.keyCode) {
                        // Seta para esquerda
                        case 37:
                            toFocus = this.getSibling(index - 1);
                            if (!toFocus.length) {
                                toFocus = this.elementRef.nativeElement.querySelectorAll('.days button:not([disabled])');
                                toFocusIndex = toFocus.length - 1;
                            }
                            toFocus[toFocusIndex].focus();
                            break;
                        // Seta para cima
                        case 38:
                            toFocus = this.getSibling(index - 7);
                            toFocusAlt = this.elementRef.nativeElement.querySelectorAll('.days button:not([disabled])')[0];

                            if (toFocus.length && index > UiElement.index(toFocus[0])) {
                                toFocus[0].focus();
                            } else {
                                toFocusAlt.focus();
                            }
                            break;
                        // Seta para direita
                        case 39:
                            toFocus = this.getSibling(index + 1);
                            if (!toFocus.length) {
                                this.elementRef.nativeElement.querySelectorAll('.days button:not([disabled])')[0].focus();
                            } else {
                                toFocus[0].focus();
                            }
                            break;
                        // // Seta para baixo
                        case 40:
                            toFocus = this.getSibling(index + 7);
                            toFocusAlt = this.elementRef.nativeElement.querySelectorAll('.days button:not([disabled])');
                            toFocusAlt = toFocusAlt[toFocusAlt.length - 1];

                            if (toFocus.length && index < UiElement.index(toFocus[0].parentNode)) {
                                toFocus[0].focus();
                            } else {
                                toFocusAlt.focus();
                            }
                            break;
                    }
                });
            });
        });

        this.elementRef.nativeElement.addEventListener('keydown', e => {
            if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
                return false;
            }
        });
    }

    getSibling(index): any[] {
        if (index < 0 || !this.elementRef.nativeElement.querySelectorAll('.day')[index]) {
            return [];
        }
        return this.elementRef.nativeElement.querySelectorAll('.day')[index].querySelectorAll('button:not([disabled])');
    }

    isDay(value) {
        const dateToCheck = this.chosenDate;
        if (!dateToCheck) {
            return;
        }

        return (
            dateToCheck.getDate() === value.getDate() &&
            dateToCheck.getMonth() === value.getMonth() &&
            dateToCheck.getFullYear() === value.getFullYear()
        );
    }

    chooseDate(value) {
        if (value) {
            this.chosenDate = value;
            if (!this.confirmSelection) {
                this.ngModel = value;
            }
            const newValue = {
                value,
                confirmSelection: this.confirmSelection
            };

            this.chosen.next(newValue);
        }
    }

    isDisabled(value) {
        const minDate = this.minDate ? new Date(this.minDate).getTime() : null;
        const maxDate = this.maxDate ? new Date(this.maxDate).getTime() : null;
        const date = value.getTime();

        return (typeof minDate === 'number' && !isNaN(minDate) && date < minDate) || (typeof maxDate === 'number' && !isNaN(maxDate) && date > maxDate);
    }

}
