import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'uiDate'
})
export class UiDatePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return this.checkDate(value) || '';
    }

    checkDate(value) {
        if (!/^[\d, \/]+$/.test(value))
            return false;
        let splittedDate = value.split('/');
        if (splittedDate.length !== 3)
            return false;
        let dayIndex, monthIndex, yearIndex;

        let mask: any = 'd/M/yy';
        mask = mask.split('/');
        for (let i = 0; i < 3; i++) {
            if (mask[i].indexOf('d') > -1)
                dayIndex = i;
            if (mask[i].indexOf('M') > -1)
                monthIndex = i;
            if (mask[i].indexOf('y') > -1)
                yearIndex = i;
        }

        if (isNaN(dayIndex) || isNaN(monthIndex) || isNaN(yearIndex))
            return false;

        let date = splittedDate[dayIndex],
            month = splittedDate[monthIndex],
            year = splittedDate[yearIndex];
        if (!date || !month || !year)
            return false;
        if (month < 1 || month > 12) {
            return false;
        }
        let dateCheck = new Date(year, month, 0).getDate();
        if (date > dateCheck || date < 1)
            return false;
        let validDate = new Date(year, month - 1, date);
        return validDate;
    }

}
