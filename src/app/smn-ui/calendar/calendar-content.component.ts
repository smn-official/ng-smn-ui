import {Component, OnChanges, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'ui-calendar-content',
    templateUrl: './calendar-content.component.html',
    styleUrls: ['./calendar-content.component.scss'],
    animations: []
})
export class CalendarContentComponent implements OnInit, OnChanges {
    maxDate: Date;
    minDate: Date;
    info: any;
    prev: any;
    ngModel: any;
    chosenDate: any;
    days: any;
    shortDays: any;
    months: any;
    shortMonths: any;
    confirmSelection = false;
    chosen: Subject<any> = new Subject();

    constructor() {
        this.days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
        this.shortDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
        this.months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        this.shortMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'];
    }

    ngOnInit() {

    }

    ngOnChanges() {
        console.log(this);
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

        if (typeof minDate === 'number' && !isNaN(minDate) && date < minDate) {
            return true;
        }
        if (typeof maxDate === 'number' && !isNaN(maxDate) && date > maxDate) {
            return true;
        }
        return false;
    }

}
