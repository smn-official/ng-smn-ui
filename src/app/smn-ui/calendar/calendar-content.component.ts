import {Component} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DatetimeService} from './datetime.service';

@Component({
    selector: 'ui-calendar-content',
    templateUrl: './calendar-content.component.html',
    styleUrls: ['./calendar-content.component.scss'],
    animations: []
})
export class CalendarContentComponent {
    maxDate: Date;
    minDate: Date;
    info: any;
    ngModel: any;
    chosenDate: any;
    days: any;
    months: any;
    confirmSelection: boolean;
    chosen: Subject<any> = new Subject();

    constructor(public datetimeService: DatetimeService) {
        this.days = datetimeService.days;
        this.months = datetimeService.months;
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
