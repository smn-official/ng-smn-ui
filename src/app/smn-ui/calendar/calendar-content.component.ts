import {AfterViewInit, Component, ElementRef} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {DatetimeService} from "./datetime.service";

@Component({
    selector: 'ui-calendar-content',
    templateUrl: './calendar-content.component.html',
    styleUrls: ['./calendar-content.component.scss'],
})
export class CalendarContentComponent implements AfterViewInit {
    maxDate: Date;
    minDate: Date;
    info: any;
    ngModel: any;
    chosenDate: any;
    days: any;
    months: any;
    confirmSelection: boolean;
    chosen: Subject<any> = new Subject();

    constructor(public datetimeService: DatetimeService, public elementRef: ElementRef) {
        this.days = datetimeService.days;
        this.months = datetimeService.months;

    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.querySelectorAll('.days button').forEach(item => {
            // const nodeList = Array.prototype.slice.call(father);
            //
            // nodeList.indexOf(el);
            item.addEventListener('keydown', e => {
                const target = e.target.parentNode;
                // const nodeList = Array.prototype.slice.call(target.parentNode);
                // console.log(target.parentNode.indexOf(target));

                let toFocus;
                let toFocusAlt;



                // switch (e.keyCode) {
                //     // Seta para esquerda
                //     case 37:
                //         toFocus = this.getSibling(target.index() - 1);
                //         if (!toFocus.length)
                //             $element.find('.days button:not([disabled]):last').focus();
                //         else
                //             toFocus.focus();
                //         break;
                //     // Seta para cima
                //     case 38:
                //         toFocus = this.getSibling(target.index() - 7);
                //         toFocusAlt = $element.find('.days button:not([disabled]):first');
                //
                //         if (toFocus.length && target.index() > toFocus.parent().index())
                //             toFocus.focus();
                //         else if (target.index() > toFocusAlt.parent().index())
                //             toFocusAlt.focus();
                //         else
                //             $element.find('.month-label').focus();
                //         break;
                //     // Seta para direita
                //     case 39:
                //         toFocus = this.getSibling(target.index() + 1);
                //         if (!toFocus.length)
                //             $element.find('.days button:not([disabled]):first').focus();
                //         else
                //             toFocus.focus();
                //         break;
                //     // Seta para baixo
                //     case 40:
                //         toFocus = this.getSibling(target.index() + 7);
                //         toFocusAlt = $element.find('.days button:not([disabled]):last');
                //
                //         if (toFocus.length && target.index() < toFocus.parent().index())
                //             toFocus.focus();
                //         else if (target.index() < toFocusAlt.parent().index())
                //             toFocusAlt.focus();
                //         else
                //             $element.find('.month-label').focus();
                //         break;
                // }
            });
        });

        this.elementRef.nativeElement.addEventListener('keydown', e => {
            if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
                return false;
            }
        });
    }

    getSibling(index) {
        return this.elementRef.nativeElement.querySelectorAll('.calendar .day')[index].querySelectorAll('button:not([disabled])');
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
