export function checkDate(value: any): any {
    if (!/^[\d, \/]+$/.test(value)) {
        return false;
    }

    const splittedDate: string[] = value.split('/');

    if (splittedDate.length !== 3) {
        return false;
    }

    let dayIndex: any;
    let monthIndex: any;
    let yearIndex: any;
    let mask: any = 'd/M/yy';

    mask = mask.split('/');
    for (let i = 0; i < 3; i++) {
        if (mask[i].indexOf('d') > -1) {
            dayIndex = i;
        }
        if (mask[i].indexOf('M') > -1) {
            monthIndex = i;
        }
        if (mask[i].indexOf('y') > -1) {
            yearIndex = i;
        }
    }

    if (isNaN(dayIndex) || isNaN(monthIndex) || isNaN(yearIndex)) {
        return false;
    }

    const date: any = splittedDate[dayIndex];
    const month: any = splittedDate[monthIndex];
    const year: any = splittedDate[yearIndex];

    if (!date || !month || !year) {
        return false;
    }
    if (month < 1 || month > 12) {
        return false;
    }
    if (year.length < 4) {
        return false;
    }

    const dateCheck: number = new Date(year, month, 0).getDate();
    if (date > dateCheck || date < 1) {
        return false;
    }

    return new Date(year, month - 1, date);
}
