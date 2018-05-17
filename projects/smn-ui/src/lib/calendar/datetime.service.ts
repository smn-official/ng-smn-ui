import {Injectable} from '@angular/core';

@Injectable()
export class UiDatetimeService {
    days: any;
    shortDays: any;
    months: any;
    shortMonths: any;

    constructor() {
        this.days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
        this.shortDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
        this.months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        this.shortMonths = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dec'];
    }

}
